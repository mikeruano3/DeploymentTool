# Steps to make it work

## Install PM2 for backend management
- INFO: https://pm2.keymetrics.io/docs/usage/quick-start/
```
npm install pm2@latest -g
pm2 start index.js --name credit --watch --log logs.log
pm2 reload credit
```
## Save credentials in server
### 1. Generating the SSH keys
INFO: https://www.freecodecamp.org/news/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca/

- When asked for the location to save the keys, accept the default location by pressing enter. A private key and public key `~/.ssh/id_rsa.pub` will be created at the default ssh location `~/.ssh/.`
```
ssh-keygen -t rsa
```
- For the work accounts, we will create different SSH keys. The below code will generate the SSH keys, and saves the public key with the tag `“email@work_mail.com”` to `~/.ssh/id_rsa_work_user1.pub`
```
ssh-keygen -t rsa -C "email@work_mail.com" -f "id_rsa_work_user1"
```
- We have two different keys created:
```
~/.ssh/id_rsa
~/.ssh/id_rsa_work_user1
```
### 2. Adding the new SSH key to the corresponding GitHub account
IMPORTANT: Do it in both accounts
- Copy the public key `~/.ssh/id_rsa.pub` and then log in to your personal GitHub account:

1. Go to Settings
2. Select SSH and GPG keys from the menu to the left.
3. Click on New SSH key, provide a suitable title, and paste the key in the box below
4. Click Add key — and you’re done!

- For the work accounts, use the corresponding public keys `~/.ssh/id_rsa_work_user1.pub` and repeat the above steps in your GitHub work accounts.

### 3. Registering the new SSH Keys with the ssh-agent
Ensure ssh-agent is running using the command `eval "$(ssh-agent -s)"`
Add the keys to the ssh-agent like so:

```
ssh-add ~/.ssh/id_rsa
ssh-add ~/.ssh/id_rsa_work_user1
```
### 4. Creating the SSH config File
Here we are actually adding the SSH configuration rules for different hosts, stating which identity file to use for which domain.

The SSH config file will be available at `~/.ssh/config`
```
cd ~/.ssh/
touch config           // Creates the file if not exists
nano config            // Opens the file
```
Make configuration entries for the relevant GitHub accounts similar to the one below in your `~/.ssh/config` file:
- IMPORTANT: change `git` for your GitHub username
```
# Personal account, - the default config
Host github.com
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa
   
# Work account-1
Host github.com-work_user1    
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_work_user1
```

### 6. While Cloning Repositories
The work repository will require a change to be made with this command:
```
git clone git@github.com-work_user1:work_user1/repo_name.git
```
### 7. For Locally Existing Repositories
If we have the repository already cloned:

List the Git remote of the repository, `git remote -v`

Check whether the URL matches our GitHub host to be used, or else update the remote origin URL.

```
git remote set-url origin git@github.com-worker_user1:worker_user1/repo_name.git
```

- If you are creating a new repository on local:

Initialize Git in the project folder git init.

Create the new repository in the GitHub account and then add it as the Git remote to the local repository.
```
git remote add origin git@github.com-work_user1:work_user1/repo_name.git
```