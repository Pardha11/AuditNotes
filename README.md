[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


This is fork of ofNotes(https://github.com/jhackshaw/ofnotes)

#### Built with

- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [ReactJS](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Dexie](https://dexie.org/)
- [React Router](https://reacttraining.com/react-router/)
- [MomentJS](https://momentjs.com/)

#### Continuous Integration

GitHub Actions is used for CI/CD and the site is deployed to netlify. CI configuration can be viewed at [.github/workflows/ofnotes.yml](https://github.com/jhackshaw/ofnotes/blob/master/.github/workflows/ofnotes.yml). Every push to master triggers the following steps:

1. Install nodejs and dependencies (npm ci)
2. Ensure prettier code style (npm format:check)
3. Run tests (npm run test -- --coverage)
4. Upload test coverage to [codecov](https://codecov.io/gh/jhackshaw/ofnotes)
5. Build production application (npm run build)
6. Deploy application to netlify

#### development

[![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://www.ofnote.site)

- Clone repo:  
  `git clone https://github.com/jhackshaw/ofnotes`
- Install dependencies:  
  `npm install`
- Run tests:  
  `npm run test`
- Run tests with code coverage:  
  `npm run test -- --coverage`
- Run development server:  
  `npm run start`
- Format source:  
  `npm run format`.
