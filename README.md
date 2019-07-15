# notetaker

## About

Notetaker is a single page web app for taking and sharing notes. Notes are shared with all the connected clients.

### Context

This is a submission for the ProdPad JavaScript Developer Challenge. Submitted on Monday 15th July 2019.

### Contact 

John Dalziel | e: [john@phidigital.com](john@phidigital.com)
| t: [@crashposition](https://twitter.com/crashposition)

---

## Client

### Getting Started

You will need NodeJS and the npm package manager on your build machine.

### Install and Run locally

1. Open the project root folder in your Terminal
2. Install dependencies by running: ```npm install```
3. Run the dev server: ```npm run serve```
4. Open a browser to: http://localhost:8080
5. Open an icognito mode browser to the same URL.
6. Gasp as they share Notes and User state!

### Build for Production

1. Open the project root folder in your Terminal
2. Install dependencies by running: ```npm install```
3. Build the project: ```npm run build```
4. The contents of the ```/dist``` folder can be deployed to your web server.

### Live Demo

A live demo is available at this URL: https://phidigital.com/notetaker

## Troublshooting

### Known Issues

- Always hit ENTER after changing a textbox or the store may not get the change event. This is a UI TextBox event issue. 

### Contact

Please contact me at john@phidigital.com if you have any problems deploying or reviewing the code.

---

## Workflow and Process

### Specifications

The full specification for the app is in this [Google Doc](https://docs.google.com/document/d/1etwGDBaJkJO6Y-TrPDayVCD7MNnYShjYb5v12_L0gJ4/edit).

I spent some time up front reviewing the spec and making design decisions that would best meet the requirements. 

#### Favourable approach

The preferred approach is to use VueJS, ES6 and event based state manipulation. 

To satisfy these requirements I scaffolded the project using the Vue CLI. This gave us a core stack of Vue, Vuex and Vue Router, and toolchain of ES6, Babel and Webpack.

#### Additional libraries

In addition to the core stack I've used:

- [Vuetify](https://vuetifyjs.com/en/) for a high quaity UI.

- [vue-native-websocket](https://github.com/nathantsoi/vue-native-websocket) to manage Web Sockets with Vuex.

- [Lodash](https://lodash.com/) and [UUID](https://github.com/kelektiv/node-uuid) utilities.

### Screen recordings

Screen recordings of the dev sessions will be available [on Dropbox](https://www.dropbox.com/sh/8vaysuqh7x6tf6a/AADE7J1kf32iCDWdxJqsTRWIa?dl=0) for the next two weeks.

- Session 1: Vue scaffolding, UI development, Model/Store, Local functionality to Add/Edit/Delete Notes (2 hours)
- Session 2: Local storage, Web sockets setup, UUID for Notes (1 hour)
- Session 3: Refactoring and Users synchronisation (1 hour)

---

## Backend Server

Sadly I out of time to do any work on the server, but I do have some thoughts and opinions on how I would implement it. These are outlined below.

#### Limitations of an Echo Server

All that an echo server does, is send any message it receives, back out to every connected client. All the responsibility for intelligence in this relationship, lives on the client. This can work fine for a small number of connected clients, but soon becomes very "chatty" as more clients connect. Each client added to the network not only increases network traffic, but also the processing requirments on each client.

#### Benefits of an Intelligent Server

The key benefit is in having a single source of truth for the state of the system. This associated with an event stream and database could also provide a permanent record of the state of the system. A smart server with a wheel and spoke model would greatly reduce network traffic to the clients.

---

## Answers to Questions

Q. What was your reasoning for implementing the solution they way you have?

A. I've discussed other design decisions elsewhere, but the key problem to be solved in the design was how do we maintain shared state across all the clients. 

I opted for a simple ping system. Each client sends a state object to the server every few seconds. The server echoes this object to all the connected clients. We don't have a smart server so there is no single "source of truth". The intelligence for resolving merges and collisions is in the client. 

All state changes are marked with a timestamp. The client determines the current state by comparing timestamps. 

A delete is also considered to be a state change. Deleting a note is tricky to sychronise if you remove the note from the array so I resolved this problem by marked deleted notes with a flag and a timestamp. Notes marked as deleted are removed from the UI, but continue to sync in the background. They are only deleted from the array after an expiry period that allows for two full syncs.

---


Q. How would you manage users going offline and online?

A. Each client maintains an array of users who are known to be online. Each client's ping contains their user ID and user name. If a client receives a ping from a new user, they get added to the User List. If a client fails to ping after a few seconds, they are removed from the list.

---

Q. How would you manage allowing users to continue editing and adding notes when in offline mode and then syncing when they come back online?

A. We use LocalStorage for this. Any changes to the Notes array are sent to LocalStorage and re-hydrated when the app restarts. 

---

Q. How would you manage conflicts between edits made by different users to the same note?

A. See above. I used a timestamp system so the most recent update wins. This is obviously far from ideal, but all I could implement in the time. There are any number of ways to improve this - keep diffs of all versions / maintain an event stream of changes (RXJS) etc.

---

Q. Which part of your solution are you most pleased with? Why?

A. I opted to give all mutable data (ie. notes, usernames) a corrosponding UUID. This allows the data to be tracked across clients even if it's value has changed.

---

Q. Which part of your solution would you consider improving on if you had the time? Why?

A. Having spent a bit more time with the problem I can see real value in event streams. My preferred implementation would match event streams with a smart server to centralise state and preserve all the state changes.

Some minor refactoring on the model to split the state out into modules. I can also clean up some of the component state using mapToState() etc.

---

Q. How did you think about security? How would you go about improving the security of the app?

A. We should be using ENV variables for the path to the WS server. We obviously need a TLS cert on the prod server as Web Sockets only work over HTTPS. On the server side we should have some Auth system (secret keys and tokens) beacause at the moment anyone can connect. Also look at rate limiting the server to reduce vulnerability to DDOS.
