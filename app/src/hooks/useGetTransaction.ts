import { useEffect, useState } from "react";
import { getTransaction } from "../api/transactionApi";
import { MainType } from "../../typings";

const useGetTransaction = () => {
  const [data, setData] = useState<MainType.TransactionType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await getTransaction();
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData: MainType.TransactionType[] = await response.json();
        setData(postsData);
        setError(null);
      } catch (err: any) {
        setError(true);
        setData(null);
      } finally {
        setLoading(false);
        setRefetch(false);
      }
    };

    fetchDataForPosts();
  }, [refetch]);

  const onRefresh = () => {
    setRefetch(true);
  };

  return { data, loading, error, onRefresh };
};

export default useGetTransaction;
