import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  pageName: string;
  pageTitle?: string;
  subBreadcrumb?: ReactNode;
}
const Breadcrumb = ({
  pageName,
  pageTitle,
  subBreadcrumb,
}: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageTitle || pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              Trang chủ /
            </Link>
          </li>
          {subBreadcrumb ? (
            <li className="font-medium">{subBreadcrumb} /</li>
          ) : (
            ''
          )}
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
