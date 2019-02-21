// eslint-disable-next-line
import React from "react";

const Scroll = (props) => {
  console.log(props); // у пропсов есть свойство children, которое содержит дочерние элементы, что-то вроде слотов во vue
  /*
  <Scroll>
    <CardList robots={filteredRobots} />
  </Scroll>
  */
  return props.children;
};

export default Scroll;
