# PlayDev API Reference

| Name | Kind | Category | Props / Params |
|---|---|---|---|
| Avatar | Component | utility | src?, alt?, size?, fallback?, status?, onClick? |
| Badge | Component | utility | content?, color?, variant?, max?, anchorOrigin?, children? |
| Button | Component | utility | children, variant?, size?, disabled?, loading?, ariaLabel? |
| Card | Component | utility | children, variant?, padding?, className? |
| CharacterPanel | Component | character | player |
| ChatBox | Component | multiplayer | messages, channel, inputPlaceholder?, onSend |
| Checkbox | Component | utility | checked?, defaultChecked?, disabled?, label?, indeterminate?, onChange? |
| CombatText | Component | feedback | value, type, position, onComplete? |
| Compass | Component | hud | heading?, waypoints? |
| ConfirmationDialog | Component | overlay | title, message, confirmText?, cancelText?, variant?, onConfirm, onCancel |
| ContextMenu | Component | overlay | items, position, onClose |
| ControlHints | Component | controls | actions, position? |
| CurrencyDisplay | Component | hud | currencyType, amount, icon?, format? |
| DamageFeedback | Component | feedback | damage, type?, duration? |
| DebugConsole | Component | debug | logs, commands, visible, onCommand, onClearLogs |
| DebugProvider | Component | context | children |
| DevInspector | Component | debug | selectedEntity, properties, methods, onPropertyChange |
| DevOverlay | Component | debug | activeTools, onToggleTool, debugState, dispatchDebug |
| DialogueBubble | Component | dialogue | speaker, text, avatar?, options?, typingSpeed?, onNext?, onOptionSelect? |
| DialogueOptions | Component | dialogue | options, selected?, onSelect |
| Dropdown | Component | utility | options, selected?, placeholder?, onChange?, disabled?, onOpen?, onClose? |
| EquipmentPanel | Component | equipment | slots, characterStats |
| EquipmentSlot | Component | equipment | slotType, item, locked?, onClick? |
| ExperienceBar | Component | hud | currentXP?, nextLevelXP?, level? |
| FocusTrap | Component | accessibility | active, children, autoFocus? |
| GameStateProvider | Component | context | children |
| HealthBar | Component | hud | current?, max?, showText?, animated?, flashOnLow? |
| HotkeyIndicator | Component | hud | action, keyOverride?, size?, children? |
| IconButton | Component | utility | icon, ariaLabel |
| InputField | Component | utility | label?, error? |
| InventoryGrid | Component | inventory | slots, columns, rows, draggable?, onSlotClick? |
| InventorySlot | Component | inventory | item, quantity?, selected?, highlight?, onClick? |
| KeyBindings | Component | controls | bindings, onReset? |
| LevelUpModal | Component | progression | newLevel, statPointsEarned, unlockedAbilities, onConfirm |
| List | Component | utility | items, renderItem, keyExtractor, itemHeight?, loading?, emptyMessage?, onItemClick?, onScroll? |
| LoadingScreen | Component | loading | progress, statusText?, backgroundImage?, tip? |
| MainMenu | Component | menu | version?, backgroundImage?, title?, onStart, onLoad, onSettings, onExit |
| ManaBar | Component | hud | current?, max? |
| MapView | Component | map | center, zoom, markers, tileLayer?, onMarkerClick?, onZoomChange? |
| MiniMap | Component | hud | width?, height?, zoom?, center?, markers?, fogOfWar? |
| Modal | Component | utility | isOpen, onRequestClose?, children, title?, size?, closeOnOverlayClick? |
| NotificationCenter | Component | hud | notifications, onDismiss, maxVisible? |
| PartyPanel | Component | multiplayer | members, leaderId |
| PauseMenu | Component | menu | onResume, onSettings, onQuit, onRestart |
| PerformanceMonitor | Component | debug | fps, frameTime, memoryUsage, drawCalls? |
| Portal | Component | utility | children, containerId? |
| ProgressBar | Component | utility | value, max?, label?, variant? |
| QuestJournal | Component | quest | quests, onSelect, onTrack, onAbandon |
| QuestTracker | Component | hud | quests, expanded?, showCompleted? |
| RadioGroup | Component | utility | options, selected?, name?, disabled?, label?, onChange? |
| ResponsiveContainer | Component | responsive | breakpoints, children |
| ScreenReaderAnnouncer | Component | accessibility | message, politeness? |
| SettingsPanel | Component | settings | settings, onChange, onSave, onReset, onClose |
| SettingsProvider | Component | context | children |
| ShopPanel | Component | economy | inventory, playerCurrency, prices, onBuy, onSell, onClose |
| SkillTree | Component | character | skills, pointsAvailable, spentPoints |
| Slider | Component | utility | min?, max?, step?, value?, defaultValue?, disabled?, label?, onChange?, onChangeEnd? |
| Spinner | Component | utility | size?, color?, variant? |
| StaminaBar | Component | hud | current?, max?, showText?, regenRate? |
| StatsDisplay | Component | character | stats, colorMap? |
| StatusEffectIcon | Component | hud | effect, remainingTime?, icon, tooltipContent, onClick? |
| Tab | Component | utility | tabs, selectedIndex?, lazy?, onChange? |
| ThemeProvider | Component | context | theme?, children |
| Toast | Component | utility | message, type?, duration?, action?, onClose, onOpen? |
| Toggle | Component | utility | checked?, defaultChecked?, disabled?, label?, onChange? |
| Tooltip | Component | utility | content, position?, children, delay?, disabled? |
| useAnnounce | Hook | hook | () => inferred |
| useAssetsLoader | Hook | hook | (assets: string[]) => inferred |
| useBreakpoint | Hook | hook | (breakpoints: Record<string, number>) => inferred |
| useCanvas | Hook | hook | (draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void, deps: unknown[]) => inferred |
| useClickOutside | Hook | hook | (ref: RefObject<T \| null>, handler: (event: MouseEvent) => void) => inferred |
| useDebounce | Hook | hook | (value: T, delay: number) => T |
| useDebug | Hook | context | () => inferred |
| useEscapeKey | Hook | hook | (handler: () => void) => inferred |
| useFocus | Hook | hook | () => [RefObject<T \| null>, boolean] |
| useFocusTrap | Hook | hook | (containerRef: RefObject<T \| null>, active: boolean, autoFocus: boolean) => inferred |
| useGameState | Hook | hook | (selector: (state: GameState) => T, equalityFn: (a: T, b: T) => boolean) => T |
| useGameStateContext | Hook | context | () => inferred |
| useHover | Hook | hook | () => [RefObject<T \| null>, boolean] |
| useId | Hook | hook | re-export of useReactId |
| useImage | Hook | hook | (src: string) => inferred |
| useInfiniteScroll | Hook | hook | (loadMore: () => void, hasMore: boolean, isLoading: boolean) => inferred |
| useKeybind | Hook | hook | (action: string, handler: (event: KeyboardEvent) => void, dependencies: unknown[], preventDefault: boolean) => inferred |
| useListNavigation | Hook | hook | (items: T[], onSelect?: (item: T, index: number) => void) => inferred |
| useOrientation | Hook | hook | () => inferred |
| usePopper | Hook | hook | (triggerRef: RefObject<T \| null>, contentRef: RefObject<U \| null>, placement: Placement, offset: number) => inferred |
| useResizeObserver | Hook | hook | (ref: RefObject<T \| null>) => DOMRectReadOnly \| null |
| useScreenShake | Hook | hook | (duration: number, intensity: number) => inferred |
| useSettings | Hook | context | () => inferred |
| useTabKeyboard | Hook | hook | (containerRef: RefObject<HTMLElement \| null>, onTabChange: (index: number) => void, tabCount: number) => inferred |
| useTheme | Hook | context | () => DesignTokens |
| useThrottle | Hook | hook | (value: T, limit: number) => T |
| useTimer | Hook | hook | (initialSeconds: number, onComplete?: () => void) => inferred |
| useTyping | Hook | hook | (text: string, speed: number) => inferred |
