import { NextPage } from "next";

export interface AppNextPageProps {
    user: any;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type AppNextPage<T = any> = NextPage<AppNextPageProps & T> ;