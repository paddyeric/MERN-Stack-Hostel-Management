import { Flex, Spin } from "antd";

const Loader = () => {
  
  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  return (

    <div>
      <Flex gap="middle" vertical>
        <Flex gap="middle">
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        </Flex>
      </Flex>
    </div>
  );
};

export default Loader;
