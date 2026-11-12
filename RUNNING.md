# How to run the app

You don't need any coding tools. You need Docker Desktop, plus one command you paste into a terminal window.

## 1. Install Docker Desktop (one time)

1. Download Docker Desktop from https://www.docker.com/products/docker-desktop/ and install it.
2. Open Docker Desktop. Wait until it says **Engine running**.

## 2. Load the app (one time)

You were sent one file. The number in its name is the version, for example `ui-test-1.0.0-apple.tar`.

- A name ending in `-intel.tar` is for Windows PCs and older Macs with an Intel chip.
- A name ending in `-apple.tar` is for Macs with an Apple chip (M1 or newer). To check which chip you have, open the  menu and choose **About This Mac**.

1. Open a terminal window:
   - **Mac:** press ⌘ + Space, type **Terminal**, and press Return.
   - **Windows:** press the Start button, type **PowerShell**, and press Enter.
2. Type `docker load -i ` (with a space at the end). Drag the `.tar` file into the window, then press Enter.
3. Wait until you see `Loaded image: ui-test:latest`. A second line also shows the version number.

## 3. Start the app (one time)

Paste this into the same window and press Enter:

```
docker run -d --name ui-test -p 3000:3000 --restart unless-stopped ui-test:latest
```

Open http://localhost:3000 in your browser. The Work Days page is at http://localhost:3000/work-days.

The app starts by itself whenever Docker Desktop is open, so you don't need to repeat this step.

## Stopping and starting

In Docker Desktop, go to **Containers**. Find **ui-test** and use the ■ (stop) and ▶ (start) buttons.

## Good to know

- Your marked work days are saved in your browser, not in Docker. They stay if you stop or update the app. They don't follow you to another browser or computer.
- **"port is already allocated"**: another program is using port 3000. Change both `3000:3000` in the command to `8080:3000`, then open http://localhost:8080.
- **"Conflict… name ui-test is already in use"**: the app is already installed. Start it from Docker Desktop instead.

## Getting an update

When you get a new file, open a terminal window as in step 2 and do the following:

1. Remove the running app. Your saved work days are kept.
   ```
   docker rm -f ui-test
   ```
2. Load the new file: repeat step 2 with the new `.tar` file.
3. Start the app: repeat step 3, pasting the same command.
4. Reload http://localhost:3000 in your browser.

To see which versions are on your computer, run `docker image ls ui-test`. To free up disk space afterwards, open Docker Desktop, go to **Images**, and delete the older `ui-test` versions.
