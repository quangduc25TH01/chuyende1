import { ConfigProvider } from 'antd';

const ConfigProviderTheme: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ConfigProvider
    theme={{
      components: {
        Input: {
          borderRadius: 4,
          borderRadiusLG: 4,
        },
        Button: {
          fontWeight: 500,
          borderRadius: 4,
          borderRadiusLG: 4,
          colorPrimaryBg: '#1890ff',
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default ConfigProviderTheme;
