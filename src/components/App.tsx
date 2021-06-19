import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import EncounterCalculator from './encounterCalculator';
import { IIndexable } from '../interfaces';
import ItemsCreator from './itemsCreator';
const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

const appNames = {
  encounterCalc: 'Encounter Calculator',
  itemCreator: 'Basic Item Creator'
};

export const App = () => {
  const [toolName, setToolName] = useState<string>('encounterCalc');
  const dmTools: IIndexable = {
    encounterCalc: {
      title: appNames.encounterCalc,
      component: <EncounterCalculator />
    },
    itemsCreator: {
      title: appNames.itemCreator,
      component: <ItemsCreator />
    }
  };

  const toolSelectHandler = (event: any) => {
    const { key } = event;
    setToolName(key);
  };

  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Header>
        <div className="logo">
          <Title style={{ color: '#FFF', fontSize: '1em', lineHeight: 'inherit' }}>GM Tools</Title>
        </div>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={[toolName]}
            onClick={toolSelectHandler}
          >
            <Menu.Item key="encounterCalc">{appNames.encounterCalc}</Menu.Item>
            <Menu.Item key="itemsCreator">{appNames.itemCreator}</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Title level={2}>{dmTools[toolName].title}</Title>
            {dmTools[toolName].component}
          </Content>
          <Footer style={{ textAlign: 'center' }}>hpadilla64</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
