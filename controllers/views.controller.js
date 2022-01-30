exports.renderIndex = (req, res, next) => {
  const users = [
    { name: "Luis", age: 29 },
    { name: "Max", age: 23 },
    { name: "John", age: 30 },
  ];
  res
    .status(200)
    .render("welcome.pug", { message: "Hello from NodeJs", users });
};
