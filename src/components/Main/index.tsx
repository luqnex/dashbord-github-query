import {
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

import { mountDate } from "../../utils";

import { MainProps } from "../../interfaces";

import { CardCustom } from "../Card";

export const Main = ({ userData, repositories }: MainProps) => {
  if (!repositories) {
    return <h1>sem conteudo</h1>;
  }

  return (
    <Box bg="background.main" width="100%" minH="100%" p="2rem 0">
      <Flex direction="column" m="0 auto" maxW="1450px" p="0 2rem">
        <Text fontWeight="bold" fontSize="1.25rem" color="text" mb="1rem">
          Detalhes do Perfil
        </Text>
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
                  <Text mb="1rem" color="text" fontSize="0.875rem">
                    {repo?.description}
                  </Text>
                  <Text mb="1rem" color="text">
                    {repo?.language}
                  </Text>
                  <Text fontSize="0.875rem" color="text">
                    Criado em {mountDate(repo?.created_at)}
                  </Text>
                  <Text fontSize="0.875rem" color="text">
                    Atualizado em {mountDate(repo?.updated_at)}
                  </Text>
                </Flex>
              </CardCustom>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};
