import { useState } from "react";

import { useQuery } from "react-query";

import { Flex } from "@chakra-ui/react";

import { api } from "../services/axios";

import { RepositoryData, UserData } from "../interfaces";

import { Main } from "../components/Main";
import { Aside } from "../components/Aside";

export const Home = () => {
  const [filter, setFilter] = useState("");

  const fetchUserData = async () => {
    if (!filter) return;

    const { data } = await api.get(`/users/${filter}`);
    return data as UserData;
  };

  const fetchRepositoryData = async () => {
    const { data } = await api.get(`/users/${userData?.login}/repos`);
    return data as RepositoryData[];
  };

  const { data: userData, refetch: refetchUserData } = useQuery(
    ["user", filter],
    fetchUserData,
    {
      retry: false,
      enabled: false,
    }
  );

  const { data: repositoriesData, refetch: refetchRepositoryData } = useQuery(
    ["repos", userData?.login],
    fetchRepositoryData,
    {
      retry: false,
      enabled: false,
    }
  );

  return (
    <Flex w="100%" minH="100vh" position="relative">
      <Aside
        userData={userData}
        filter={filter}
        setFilter={setFilter}
        refetchUserData={refetchUserData}
        refetchRepositoryData={refetchRepositoryData}
      />
      <Main userData={userData} repositories={repositoriesData} />
    </Flex>
  );
};
