import { githubUserSchema2, githubUsersSchema } from '@gipo355/shared-types';

import { ajvInstance } from '../utils';

export const validateGithubUsers = ajvInstance.compile(githubUsersSchema);
export const validateGithubUser2 = ajvInstance.compile(githubUserSchema2);
