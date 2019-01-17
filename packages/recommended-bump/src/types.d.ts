import { Commit, Plugins } from 'parse-commit-message';

export type Commits = string | Commit | Array<string> | Array<Commit>;
export type RecommendedBumpResult = {
  commits: Array<Commit>;
  increment: string | boolean;
  isBreaking: boolean;
  patch?: boolean;
  major?: boolean;
  minor?: boolean;
};

export type RecommendedBumpOptions = { plugins?: Plugins };
