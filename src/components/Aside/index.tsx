import { ChangeEvent } from "react";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Divider,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { AsideProps } from "../../interfaces";

import { CardCustom } from "../Card";

export const Aside = ({
  filter,
  userData,
  recentUserSearch,
  setFilter,
  refetchUserData,
  handleClickCardRecentUser,
  handleClickCardUser,
}: AsideProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <Box
      bg="background.aside"
      w="30%"
      maxW="35rem"
      minH="100vh"
      p="2rem 1.2rem"
    >
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
            onClick={() => refetchUserData()}
          >
            Buscar
          </Button>
        </InputRightElement>
      </InputGroup>
      <Box h="8rem">
        {userData?.name && (
          <Box m="1.5rem 0 2.5rem 0">
            <CardCustom onClick={handleClickCardUser}>
              <Flex align="center" gap="1rem">
                <Avatar src={userData.avatar_url} />
                <Flex direction="column">
                  <Text fontWeight="bold" color="text">
                    {userData.name}
                  </Text>
                  <Text color="green" fontSize="0.875rem">
                    {userData.login}
                  </Text>
                </Flex>
              </Flex>
            </CardCustom>
          </Box>
        )}
      </Box>
      {recentUserSearch.length > 0 && (
        <>
          <Divider />
          <Text fontWeight="bold" color="text" mt="5">
            Recentes
          </Text>
          {recentUserSearch.map((recentUserData) => (
            <Box key={recentUserData.login} mt="5">
              <CardCustom
                onClick={() => handleClickCardRecentUser(recentUserData)}
              >
                <Flex align="center" gap="1rem">
                  <Avatar src={recentUserData.avatar_url} />
                  <Flex direction="column">
                    <Text fontWeight="bold" color="text">
                      {recentUserData.name}
                    </Text>
                    <Text color="green" fontSize="0.875rem">
                      {recentUserData.login}
                    </Text>
                  </Flex>
                </Flex>
              </CardCustom>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};
