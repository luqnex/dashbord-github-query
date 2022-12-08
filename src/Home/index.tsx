import { useState } from "react";

import { useQuery } from "react-query";

import { Flex } from "@chakra-ui/react";

import { api } from "../services/axios";

import { UserData } from "../interfaces";

import { Main } from "../components/Main";
import { Aside } from "../components/Aside";

export const Home = () => {
  const [filter, setFilter] = useState("");

  const fetchData = async () => {
    if (!filter) return;

    const { data } = await api.get(`/users/${filter}`);
    return data as UserData;
  };

  const { data, refetch } = useQuery(["user", filter], fetchData, {
    retry: false,
    enabled: false,
  });

  return (
    <Flex w="100%" h="100vh">
      <Aside
        user={data}
        filter={filter}
        refetch={refetch}
        setFilter={setFilter}
      />
      <Main />
    </Flex>
  );
};
