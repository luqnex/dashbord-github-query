import { Dispatch, SetStateAction } from "react";

import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";

export type UserData = {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  created_at: Date;
  public_repos: number;
  following: number;
  followers: number;
};

export type RepositoryData = {
  id: number;
  name: string;
  language: string;
  url: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export type MainProps = {
  userData: UserData | undefined;
  repositories: RepositoryData[] | undefined;
};

export type AsideProps = {
  filter: string;
  recentUserSearch: UserData[];
  userData: UserData | undefined;
  handleClickCardUser: () => void;
  handleClickCardRecentUser: (userData: UserData) => void;

  setFilter: Dispatch<SetStateAction<string>>;
  setSelectedUser: Dispatch<SetStateAction<UserData>>;
  refetchUserData: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<UserData | undefined, unknown>>;
  refetchRepositoryData: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<RepositoryData[] | undefined, unknown>>;
  refetchRepositoryRecentData: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<RepositoryData[], unknown>>;
};
