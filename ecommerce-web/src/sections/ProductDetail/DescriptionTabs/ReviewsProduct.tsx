import React from 'react';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import moment from 'moment';

import { Button } from '@/components/ui/button';
import { Input, TextArea } from '@/components/ui/Input';
import Review from '@/api/Review';

interface Review {
  name: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: Date | string;
}

const initReviews: Review = {
  name: '',
  email: '',
  rating: 5,
  comment: '',
  createdAt: new Date().toLocaleDateString(),
};

const ReviewsProduct = ({ productId }: { productId: number }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState(initReviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await Review.getReviewByProductId(productId);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleAddReview = async () => {
    if (!newReview.name || !newReview.email) return;

    try {
      const { data } = await Review.addReview(productId, {
        ...newReview,
      });
      setReviews([...reviews, data]);
      setNewReview(initReviews);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : '0';

  return (
    <div className="review-product-wrapper">
      <div className="max-w-2xl mx-auto lg:p-4 p-0">
        <h2 className="text-xl font-bold text-center mb-4">
          Đánh giá sản phẩm
        </h2>
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">{averageRating} / 5</p>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={i < Math.round(Number(averageRating)) ? 'gold' : 'none'}
                color={i < Math.round(Number(averageRating)) ? 'gold' : 'gray'}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            ({reviews.length} đánh giá)
          </p>
        </div>

        <div className="mb-4 p-4 border rounded-lg shadow-sm">
          <h3 className="md:text-lg text-base text-center font-semibold mb-2">
            Viết đánh giá
          </h3>
          <Input
            type="text"
            placeholder="Tên của bạn"
            value={newReview.name}
            onChange={(e: any) =>
              setNewReview({ ...newReview, name: e.target.value })
            }
          />
          <Input
            type="email"
            placeholder="Email"
            value={newReview.email}
            onChange={(e: any) =>
              setNewReview({ ...newReview, email: e.target.value })
            }
          />
          <TextArea
            placeholder="Nhận xét của bạn"
            rows={4}
            value={newReview.comment}
            onChange={(e: any) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
          ></TextArea>
          <div className="flex items-center gap-2 mb-2">
            <p>Đánh giá:</p>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={i < newReview.rating ? 'gold' : 'none'}
                color={i < newReview.rating ? 'gold' : 'gray'}
                className="cursor-pointer"
                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
              />
            ))}
          </div>
          <Button
            onClick={handleAddReview}
            className="w-full mt-4"
            disabled={!newReview.name || !newReview.email || !newReview.comment}
          >
            Gửi đánh giá
          </Button>
        </div>

        {reviews.map((review, idx) => (
          <div key={idx} className="gap-4 border-b py-4">
            <div>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{review.name}</p>
                <span>{moment(review.createdAt).format('DD/MM/YYYY')}</span>
              </div>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? 'gold' : 'none'}
                    color={i < review.rating ? 'gold' : 'gray'}
                  />
                ))}
              </div>
              <p className="mt-2">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ReviewsProduct);
