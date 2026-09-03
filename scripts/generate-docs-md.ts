import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative, sep } from 'path';
import ts from 'typescript';

const SRC = join(__dirname, '..', 'src');
const OUT = join(__dirname, '..', 'Document.md');

interface Row {
  name: string;
  kind: 'Component' | 'Hook';
  category: string;
  details: string;
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.tsx?$/.test(full) ? [full] : [];
  });
}

function categoryOf(file: string): string {
  const [top, sub] = relative(SRC, file).split(sep);
  if (top === 'components') return sub;
  if (top === 'hooks') return 'hook';
  if (top === 'contexts') return 'context';
  if (top === 'utils') return 'utility';
  return top;
}

function isExported(node: ts.Node): boolean {
  return !!(
    ts.canHaveModifiers(node) &&
    ts.getModifiers(node)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  );
}

function membersOf(node: ts.InterfaceDeclaration | ts.TypeLiteralNode): string {
  const names = node.members
    .filter(ts.isPropertySignature)
    .map((m) => m.name.getText() + (m.questionToken ? '?' : ''));
  return names.length ? names.join(', ') : 'none';
}

function findNamedType(sf: ts.SourceFile, name: string): string {
  let result = 'none';
  ts.forEachChild(sf, (node) => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === name) result = membersOf(node);
    if (
      ts.isTypeAliasDeclaration(node) &&
      node.name.text === name &&
      ts.isTypeLiteralNode(node.type)
    ) {
      result = membersOf(node.type);
    }
  });
  return result;
}

function propsFromType(sf: ts.SourceFile, typeNode: ts.TypeNode | undefined): string {
  if (!typeNode || !ts.isTypeReferenceNode(typeNode)) return 'none';
  const arg = typeNode.typeArguments?.[0];
  if (!arg) return 'none';
  if (ts.isTypeLiteralNode(arg)) return membersOf(arg);
  if (ts.isTypeReferenceNode(arg)) return findNamedType(sf, arg.typeName.getText());
  return 'none';
}

function isFC(typeNode: ts.TypeNode | undefined): boolean {
  return (
    !!typeNode &&
    ts.isTypeReferenceNode(typeNode) &&
    /^(React\.)?(FC|FunctionComponent)$/.test(typeNode.typeName.getText())
  );
}

function paramsOf(params: ts.NodeArray<ts.ParameterDeclaration>): string {
  return params
    .map(
      (p) =>
        p.name.getText() + (p.questionToken ? '?' : '') + (p.type ? `: ${p.type.getText()}` : ''),
    )
    .join(', ');
}

function extract(file: string): Row[] {
  const text = readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const category = categoryOf(file);
  const rows: Row[] = [];

  ts.forEachChild(sf, (node) => {
    if (ts.isFunctionDeclaration(node) && node.name && isExported(node)) {
      const name = node.name.text;
      if (/^use[A-Z0-9]/.test(name)) {
        rows.push({
          name,
          kind: 'Hook',
          category,
          details: `(${paramsOf(node.parameters)}) => ${node.type?.getText() ?? 'inferred'}`,
        });
      } else if (/^[A-Z]/.test(name)) {
        const paramType = node.parameters[0]?.type;
        const details =
          paramType && ts.isTypeReferenceNode(paramType)
            ? findNamedType(sf, paramType.typeName.getText())
            : paramType && ts.isTypeLiteralNode(paramType)
              ? membersOf(paramType)
              : 'none';
        rows.push({ name, kind: 'Component', category, details });
      }
      return;
    }

    if (ts.isVariableStatement(node) && isExported(node)) {
      for (const decl of node.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue;
        const name = decl.name.text;
        const init = decl.initializer;
        if (/^use[A-Z0-9]/.test(name) && init) {
          rows.push({
            name,
            kind: 'Hook',
            category,
            details:
              ts.isArrowFunction(init) || ts.isFunctionExpression(init)
                ? `(${paramsOf(init.parameters)}) => ${init.type?.getText() ?? 'inferred'}`
                : `re-export of ${init.getText()}`,
          });
        } else if (isFC(decl.type)) {
          rows.push({ name, kind: 'Component', category, details: propsFromType(sf, decl.type) });
        }
      }
    }
  });

  return rows;
}

const rows = walk(SRC)
  .flatMap(extract)
  .sort((a, b) => a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name));

const lines = [
  '| Name | Kind | Category | Props / Params |',
  '|---|---|---|---|',
  ...rows.map(
    (r) => `| ${r.name} | ${r.kind} | ${r.category} | ${r.details.replace(/\|/g, '\\|')} |`,
  ),
];

writeFileSync(OUT, `# PlayDev API Reference\n\n${lines.join('\n')}\n`);
console.log(`docs.md written: ${rows.length} entries`);
