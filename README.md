# Steps to make it work

## Install PM2 for backend management
- INFO: https://pm2.keymetrics.io/docs/usage/quick-start/
```
npm install pm2@latest -g
pm2 start index.js --name credit --watch --log logs.log
pm2 reload credit
```

## 2. Save credentials in server
INFO: https://git-scm.com/docs/git-credential-store

### If both projects are in only one Git account
1. Unset user credentials: `git config --global --unset credential.helper`
```
 git config credential.helper store
 git push http://example.com/repo.git
Username: <type your username>
Password: <type your password>

[several days later]
 git push http://example.com/repo.git
[your credentials are used automatically]

```

### If both projects are in diferent Git Accounts
1. Use exadecimal symbols, ex: `#` equals `%23` and `@` equals `%40` 
2. Add each credential to a different file `~/.git-credentials-{ProjectName}`
3. User pattern `https://{user}:{password}@github.com`
4. Execute inside repo `git config credential.helper store --file=~/.git-credentials-{ProjectName}`
```
nano ~/.git-credentials-backend
 => https://example:password@github.com

git config credential.helper store ~/.git-credentials-backend
git push http://example.com/repo.git

```

