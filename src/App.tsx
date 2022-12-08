import { QueryClient, QueryClientProvider } from "react-query";

import { ChakraProvider } from "@chakra-ui/react";

import { Home } from "./Home";
import { theme } from "./shared/themes/theme";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Home />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
