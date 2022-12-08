import { ChangeEvent, Dispatch, SetStateAction } from "react";

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";

import { CardCustom } from "../Card";

import { UserData } from "../../interfaces";

type AsideProps = {
  filter: string;
  user: UserData | undefined;
  setFilter: Dispatch<SetStateAction<string>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<UserData | undefined, unknown>>;
};

export const Aside = ({ filter, user, refetch, setFilter }: AsideProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <Box bg="background.aside" width="35rem" height="100%" p="3rem 1.2rem">
      <Text mb="1.5" fontWeight="bold" fontSize="1.25rem" color="text">
        Encontrar Dev
      </Text>
      <InputGroup size="lg" boxShadow={"2xl"}>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          pl="3rem"
          type="text"
          placeholder="GitHub username..."
          bg="white"
          border="none"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          fontSize="1rem"
          value={filter ?? ""}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem" m="0 1rem">
          <Button
            h="1.75rem"
            size="sm"
            textColor="white"
            bg="background.button"
            fontWeight="400"
            _hover={{
              opacity: "0.9",
            }}
            onClick={() => refetch()}
          >
            Buscar
          </Button>
        </InputRightElement>
      </InputGroup>
      {user?.name && (
        <CardCustom>
          <Text>{user.name}</Text>
          <Text>{user.login}</Text>
        </CardCustom>
      )}
    </Box>
  );
};
