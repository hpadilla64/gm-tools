import { useState } from 'react';
import { Layout, Menu, Typography, type MenuProps } from 'antd';
import { CalculatorOutlined, AppstoreAddOutlined, OrderedListOutlined } from '@ant-design/icons';
import EncounterCalculator from './encounterCalculator';
import ItemsCreator from './itemsCreator';
import InitiativeTracker from './initiativeTracker';
import { IIndexable } from '../interfaces';
const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

const appNames = {
  encounterCalc: 'Encounter Calculator',
  itemCreator: 'Basic Item Creator',
  initiativeTracker: 'Initiative Tracker'
};

const appVersion = '0.0.1';

export const App = () => {
  const [toolName, setToolName] = useState<string>('encounterCalc');
  const dmTools: IIndexable = {
    encounterCalc: {
      title: appNames.encounterCalc,
      component: <EncounterCalculator />,
      icon: <CalculatorOutlined />
    },
    itemsCreator: {
      title: appNames.itemCreator,
      component: <ItemsCreator />,
      icon: <AppstoreAddOutlined />
    },
    initiativeTracker: {
      title: appNames.initiativeTracker,
      component: <InitiativeTracker />,
      icon: <OrderedListOutlined />
    }
  };

  const toolSelectHandler: MenuProps['onClick'] = ({ key }) => {
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
          <Title style={{ color: '#FFF', fontSize: '1em', lineHeight: 'inherit' }}>
            GM Tools
            <span
              style={{
                padding: '.25em',
                fontSize: '.8em',
                borderRadius: '.25em',
                backgroundColor: '#ddd',
                color: '#333',
                marginLeft: '.5em'
              }}
            >
              v.{appVersion}
            </span>
          </Title>
        </div>
      </Header>
      <Layout>
        <Sider width={200} breakpoint="md">
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={[toolName]}
            onClick={toolSelectHandler}
            items={Object.entries(dmTools).map(([key, value]) => ({
              key,
              icon: value.icon,
              label: value.title
            }))}
          />
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
