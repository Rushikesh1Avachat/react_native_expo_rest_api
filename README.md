# React Native Expo REST API App

A two-screen React Native application built with Expo that fetches comments from a public REST API, displays them in a performant paginated list, and navigates to a detail screen.

## Features

- **Comments List**: Paginated list with lazy loading, search functionality, and pull-to-refresh
- **Comment Detail**: Full comment view with navigation parameters
- **Clean UI**: Minimal design with consistent spacing and typography
- **Performance**: Optimized FlatList with virtualization
- **Error Handling**: Retry mechanisms and loading states

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (Stack Navigation)
- **API**: JSONPlaceholder (https://jsonplaceholder.typicode.com/comments)
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect, useCallback, useMemo)
- **Styling**: StyleSheet with theme constants

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- Android Studio (for Android emulator) or Xcode (for iOS simulator)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react_native_expo_rest_api.git
   cd react_native_expo_rest_api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

## Run Steps

### Android

1. Start the Expo server: `npx expo start`
2. Press `a` to open Android emulator, or scan QR code with Expo Go app on device

### iOS

1. Start the Expo server: `npx expo start`
2. Press `i` to open iOS simulator, or scan QR code with Expo Go app on device

### Web

1. Start the Expo server: `npx expo start`
2. Press `w` to open in web browser

## Screenshots

### Comments List Screen
![Comments List](screenshots/comments_list.png)

### Comment Detail Screen
![Comment Detail](screenshots/comment_detail.png)

## Assumptions and Trade-offs

- **API**: Uses JSONPlaceholder for demo purposes. In production, replace with real API endpoints.
- **Pagination**: Implements client-side pagination with API query parameters. For large datasets, consider server-side pagination.
- **Search**: Client-side filtering of loaded comments. For better performance with large datasets, implement server-side search.
- **Platform**: Tested on Android/iOS. Web support is basic due to Expo Router limitations.
- **Dependencies**: Minimal dependencies to keep bundle size small. Added only essential packages.
- **Error Handling**: Basic error states. In production, add more sophisticated error boundaries and logging.
- **Performance**: Optimized for 500 comments. For larger datasets, consider virtualization improvements.

## Project Structure

```
src/
├── api/           # API calls
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── navigation/    # Navigation configuration
├── screens/       # Screen components
├── theme/         # Theme constants
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## License

MIT License
