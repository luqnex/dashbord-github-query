import { useEffect, useState } from "react";

import { useQuery } from "react-query";

import { Flex } from "@chakra-ui/react";

import { api } from "../services/axios";

import { RepositoryData, UserData } from "../interfaces";

import { Main } from "../components/Main";
import { Aside } from "../components/Aside";

export const Home = () => {
  const [filter, setFilter] = useState("");
  const [jsonColors, setJsonColors] = useState<any>();
  const [selectedUser, setSelectedUser] = useState({} as UserData);
  const [recentUserSearch, setRecentUserSearch] = useState<UserData[]>([]);

  const fetchUserData = async (filter: string) => {
    if (!filter) return;

    const { data } = await api.get(`/users/${filter}`);
    return data as UserData;
  };

  const fetchRepositoryData = async (login?: string) => {
    const { data } = await api.get(`/users/${login}/repos`);
    return data as RepositoryData[];
  };

  const { data: userData, refetch: refetchUserData } = useQuery(
    ["user", filter],
    () => fetchUserData(filter),
    {
      retry: false,
      enabled: false,
    }
  );

  const { data: selectedUserData, refetch: refetchSelectedUserData } = useQuery(
    ["user", selectedUser?.login],
    () => fetchUserData(selectedUser?.login),
    {
      retry: false,
      enabled: false,
    }
  );

  const {
    data: repositoriesData,
    refetch: refetchRepositoryData,
    isLoading: isLoadingRepository,
  } = useQuery(
    ["repos", selectedUser?.login],
    () => fetchRepositoryData(userData?.login),
    {
      retry: false,
      enabled: false,
    }
  );

  const { refetch: refetchRepositoryRecentData } = useQuery(
    ["repos", selectedUser?.login],
    () => fetchRepositoryData(selectedUser?.login),
    {
      retry: false,
      enabled: false,
    }
  );

  const handleExistsUserInRecentList = () => {
    return recentUserSearch.find((item) => item.login === userData?.login);
  };

  const handleClickCardUser = () => {
    if (userData && !handleExistsUserInRecentList()) {
      setRecentUserSearch((old) => [...old, userData]);
      setSelectedUser(userData);
      refetchSelectedUserData();
      refetchRepositoryData();
    }
  };

  const handleClickCardRecentUser = (userData: UserData) => {
    setSelectedUser(userData);
  };

  useEffect(() => {
    const fetchJsonLangColors = async () => {
      const res = await fetch("github-lang-colors.json", {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setJsonColors(data);
    };
    fetchJsonLangColors();
  }, []);

  useEffect(() => {
    if (selectedUser?.login) {
      refetchSelectedUserData();
      refetchRepositoryRecentData();
    }
  }, [selectedUser, refetchRepositoryRecentData, refetchSelectedUserData]);

  return (
    <Flex w="100%" minH="100vh" position="relative">
      <Aside
        filter={filter}
        userData={userData}
        recentUserSearch={recentUserSearch}
        setFilter={setFilter}
        setSelectedUser={setSelectedUser}
        refetchUserData={refetchUserData}
        handleClickCardUser={handleClickCardUser}
        handleClickCardRecentUser={handleClickCardRecentUser}
      />
      <Main
        jsonColors={jsonColors}
        userData={selectedUserData}
        repositories={repositoriesData}
        isLoadingRepository={isLoadingRepository}
      />
    </Flex>
  );
};
