import Drawer, { DrawerProps } from 'components/Drawer';
import moment from 'moment';
import { OrderStatus } from '../columnConfigs';

interface PreviewOrderProps extends DrawerProps {
  order: any;
}

const PreviewOrder = (props: PreviewOrderProps) => {
  const { order } = props;

  return (
    <Drawer {...props} title="Chi tiết đơn hàng">
      <div>
        <div className="order-detail p-4 ">
          <p>
            Mã đơn hàng: <strong>#{order.orderId}</strong>
          </p>
          <p>
            Ngày tạo:{' '}
            <span>{moment(order.createdAt).format('HH:MM DD/MM/YYYY')}</span>
          </p>
          <p>
            Khách hàng:{' '}
            <span className="">
              {order.name} ({order.email} - {order.phone} - {order.address})
            </span>
          </p>
          <p>
            Trạng thái đơn hàng:{' '}
            <span className={`text-${order.status}`}>
              {OrderStatus[order.status]}
            </span>
          </p>

          <p>
            Tình trạng thanh toán:{' '}
            <span
              className={`${
                order.paidStatus ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {order.paidStatus ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </span>
          </p>
          <p>
            Nội dung: <span className="font-medium">{order.note}</span>
          </p>

          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse md:text-base text-sm min-w-[640px]">
              <thead>
                <tr>
                  <th className="p-2 border-[2px]">Mã sản pẩm</th>
                  <th className="p-2 border-[2px]">Tên sản phẩm</th>
                  <th className="py-2 border-[2px]">Số lượng</th>
                  <th className="p-2 border-[2px]">Giá</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((orderItem: any) => (
                  <tr key={orderItem.id}>
                    <td className="p-2 border text-center">
                      <span className="font-medium">
                        {orderItem.product.code}
                      </span>
                    </td>
                    <td className="p-2 border text-center">
                      {orderItem.product.name}
                    </td>
                    <td className="p-2 border text-center">
                      {orderItem.quantity} Cái
                    </td>
                    <td className="p-2 border text-center">
                      {orderItem.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default PreviewOrder;
