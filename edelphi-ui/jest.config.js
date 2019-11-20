module.exports = {
  "moduleFileExtensions": {
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
  },
  "roots": {
    "<rootDir>/src",
  },
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "testRegex": "(/__specs__/.*|(\\.|/)spec)\\.tsx?$",
  "transform": {
    "^.+\\.tsx",
  },
}