import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { Colors } from '@constants';
import { useColorScheme } from 'components/useColorScheme';
import { useClientOnlyValue } from 'components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dieetvoorkeuren',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      {/* TODO: #2739-8127-3241 */}
      {/* <Tabs.Screen
        name="scanner"
        options={{
          title: 'scanner',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /> */}
    </Tabs>
  );
}

// TODO: #2739-8127-3241
// WARN[Layout children]: Too many screens defined.Route "scanner" is extraneous. 
//     at anonymous(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:138731:38)
//   at TabLayout(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:123804:58)
//     at Suspense
//     at Route(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:138841:24)
//       at Route((tabs))(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:139208:24)
//         at StaticContainer(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:132902:17)
//           at EnsureSingleNavigator(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:129623:24)
//             at SceneView(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:132789:22)
//               at RCTView
//     at View(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:40819:43)
//                 at DebugContainer(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:138385:36)
//                   at MaybeNestedStack(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:134522:23)
//                     at RCTView
//     at View(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:40819:43)
//                       at RNSScreen
//     at Animated(Anonymous)(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:100971:62)
//                         at Suspender(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:137374:22)
//                           at Suspense
//     at Freeze(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:137388:23)
//                             at DelayedFreeze(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:137334:22)
//                               at InnerScreen(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:137130:36)
//                                 at Screen(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:137289:36)
//                                   at SceneView(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:134582:22)
//                                     at Suspender(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:137374:22)
//                                       at Suspense
//     at Freeze(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:137388:23)
//                                         at DelayedFreeze(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:137334:22)
//                                           at RNSScreenStack
//     at ScreenStack(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:137705:25)
//                                             at NativeStackViewInner(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:134825:22)
//                                               at RCTView
//     at View(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:40819:43)
//                                                 at SafeAreaProviderCompat(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:136574:24)
//                                                   at NativeStackView
//     at PreventRemoveProvider(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:131709:25)
//                                                     at NavigationContent(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:132551:22)
//                                                       at anonymous(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:132567:27)
//                                                         at NativeStackNavigator(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:127486:18)
//                                                           at anonymous(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:138731:38)
//                                                             at ThemeProvider(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:133922:21)
//                                                               at RootLayoutNav(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:177027:58)
//                                                                 at RootLayout(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:176995:44)
//                                                                   at Try(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:142710:22)
//                                                                     at Suspense
//     at Route(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:138841:24)
//                                                                       at Route()(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:139208:24)
//                                                                         at RNCSafeAreaProvider
//     at SafeAreaProvider(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:135561:24)
//                                                                           at wrapper(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:148427:27)
//                                                                             at EnsureSingleNavigator(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:129623:24)
//                                                                               at BaseNavigationContainer(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:128119:28)
//                                                                                 at ThemeProvider(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:133922:21)
//                                                                                   at NavigationContainerInner(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:148884:26)
//                                                                                     at ContextNavigator(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:148462:24)
//                                                                                       at ExpoRoot(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:148418:28)
//                                                                                         at App
//     at ErrorToastContainer(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:233357:24)
//                                                                                           at ErrorOverlay
//     at withDevTools(ErrorOverlay)(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:232860:27)
//                                                                                             at RCTView
//     at View(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:40819:43)
//                                                                                               at RCTView
//     at View(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:40819:43)
//                                                                                                 at AppContainer(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:40662:25)
//                                                                                                   at main(RootComponent)(http://localhost:8081/node_modules/expo-router/entry.bundle//&platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false&modulesOnly=false&runModule=true&app=com.anonymous.frontend&transform.routerRoot=app&transform.engine=hermes&transform.bytecode=true:118992:28)
