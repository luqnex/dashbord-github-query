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
  html_url: string;
};

export type RepositoryData = {
  id: number;
  name: string;
  language: string;
  url: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  svn_url: string;
};

export type MainProps = {
  jsonColors: any;
  isLoadingRepository: boolean;
  userData: UserData | undefined;
  repositories: RepositoryData[] | undefined;
};

export type AsideProps = {
  filter: string;
  recentUserSearch: UserData[];
  userData: UserData | undefined;
  setFilter: Dispatch<SetStateAction<string>>;
  handleClickCardUser: () => void;
  handleClickCardRecentUser: (userData: UserData) => void;
  setSelectedUser: Dispatch<SetStateAction<UserData>>;
  refetchUserData: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<UserData | undefined, unknown>>;
};
