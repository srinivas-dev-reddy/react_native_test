export type navigation = NavigationProp<
  ReactNavigation.RootParamList,
  never,
  undefined,
  Readonly<{
    key: string;
    index: number;
    routeNames: never[];
    history?: unknown[] | undefined;
    routes: NavigationRoute<ReactNavigation.RootParamList, never>[];
    type: string;
    stale: false;
  }>,
  {},
  {}
>;
