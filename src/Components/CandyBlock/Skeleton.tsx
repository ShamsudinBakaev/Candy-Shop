import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="candy-block"
    speed={2}
    width={280}
    height={539}
    viewBox="0 0 280 539"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="7" y="107" rx="20" ry="20" width="260" height="111" />
    <rect x="0" y="378" rx="10" ry="10" width="280" height="93" />
    <rect x="1" y="501" rx="5" ry="5" width="47" height="27" />
    <rect x="20" y="317" rx="9" ry="9" width="240" height="16" />
    <rect x="41" y="340" rx="9" ry="9" width="200" height="16" />
    <rect x="124" y="492" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
