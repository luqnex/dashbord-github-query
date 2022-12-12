/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { mountDate } from "../../utils";

import { MainProps } from "../../interfaces";

import { CardCustom } from "../Card";

export const Main = ({
  userData,
  jsonColors,
  repositories,
  isLoadingRepository,
}: MainProps) => {
  if (isLoadingRepository) {
    return (
      <Flex
        w="100%"
        h="100vh"
        justify="center"
        align="center"
        direction="column"
        gap="1rem"
      >
        <Text fontWeight="bold" fontSize="1.5rem" color="textGrayMain">
          Carregando...
        </Text>
      </Flex>
    );
  }

  if (!repositories) {
    return (
      <Flex
        w="100%"
        h="100vh"
        justify="center"
        align="center"
        direction="column"
        gap="1rem"
      >
        <Text fontWeight="bold" fontSize="1.5rem" color="textGrayMain">
          PESQUISE UM PERFIL DO GITHUB
        </Text>
        <SearchIcon fontSize="3rem" color="textGrayMain" />
      </Flex>
    );
  }

  const handleColor = (lang: string) => {
    return Object.entries(jsonColors).filter((item) => item[0] === lang);
  };

  return (
    <Box bg="background.main" width="100%" minH="100%" p="2rem 0">
      <Flex direction="column" m="0 auto" maxW="1450px" p="0 2rem">
        <Text fontWeight="bold" fontSize="1.25rem" color="text" mb="1rem">
          Detalhes do Perfil
        </Text>
        <a href={userData?.html_url} target="_blank" rel="noreferrer">
          <CardCustom>
            <Flex align="center" justify="space-between" gap="2rem" p="1rem">
              <Avatar src={userData?.avatar_url} w="15rem" h="15rem" />
              <Flex w="100%" direction="column">
                <Flex justify="space-between" gap="2rem">
                  <Box>
                    <Text fontWeight="bold" color="text">
                      {userData?.name}
                    </Text>
                    <Text color="green" fontSize="0.875rem">
                      {userData?.login}
                    </Text>
                  </Box>
                  <Box>
                    {userData && (
                      <Text color="textGray">
                        Ingressou em {mountDate(userData.created_at)}
                      </Text>
                    )}
                  </Box>
                </Flex>
                <Box>
                  <Text color="textGray" mt="2rem">
                    {userData?.bio}
                  </Text>
                </Box>
                <Card
                  mt="2rem"
                  p="1.5rem"
                  variant="filled"
                  bg="background.cardFilled"
                >
                  <Flex justify="space-between">
                    <Flex direction="column" align="center">
                      <Text>Repositórios</Text>
                      <Text>{userData?.public_repos}</Text>
                    </Flex>
                    <Flex direction="column" align="center">
                      <Text>Seguidores</Text>
                      <Text>{userData?.followers}</Text>
                    </Flex>
                    <Flex direction="column" align="center">
                      <Text>Seguindo</Text>
                      <Text>{userData?.following}</Text>
                    </Flex>
                  </Flex>
                </Card>
              </Flex>
            </Flex>
          </CardCustom>
        </a>
        <Text
          fontWeight="bold"
          fontSize="1.25rem"
          color="text"
          m="3rem 0 1rem 0"
        >
          Repositórios
        </Text>
        <Grid
          width="100%"
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap="1rem"
        >
          {repositories?.map((repo) => (
            <GridItem key={repo.id} width="100%" height="15rem">
              <a href={repo.svn_url} target="_blank" rel="noreferrer">
                <CardCustom>
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    h="100%"
                    textAlign="center"
                  >
                    <Text
                      mb="1rem"
                      color="text"
                      fontSize="1rem"
                      fontWeight="bold"
                    >
                      {repo?.name}
                    </Text>
                    <Text
                      mb="1rem"
                      color="text"
                      fontSize="0.875rem"
                      noOfLines={2}
                    >
                      {repo?.description}
                    </Text>
                    <Flex align="center" gap="0.5rem" mb="1rem">
                      <Box
                        w="1rem"
                        h="1rem"
                        bg={
                          handleColor(repo.language).map(
                            (item) => item[1]
                          )[0] as string
                        }
                        borderRadius="50%"
                      />
                      <Text color="text">{repo?.language}</Text>
                    </Flex>
                    <Text fontSize="0.875rem" color="text">
                      Criado em {mountDate(repo?.created_at)}
                    </Text>
                    <Text fontSize="0.875rem" color="text">
                      Atualizado em {mountDate(repo?.updated_at)}
                    </Text>
                  </Flex>
                </CardCustom>
              </a>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};
