import { useState, useEffect } from 'react';
import fetchApi from '../service/fetchApi';

type data = {
  count: number;
  next: string;
  previous: string;
  results: planet[];
};

type planet = {
  name: string;
  climate: string;
  created: string;
  diameter: string;
  gravity: string;
  population: string;
  orbital_period: string;
  url: string;
};

export default function useSWPlanets() {
  const [nameList, setNameList] = useState<planet[] | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(null);

  const getData = async () => {
    try {
      setIsloading(true);
      const planetList: planet[] = [];
      const planetsData = await fetchApi(`https://swapi.dev/api/planets`);
      const count = planetsData?.count || 0;
      const results = planetsData?.results.length || 0;
      const pages = Math.ceil(count / results);
      for (let i = 1; i <= pages; i++) {
        const data = await fetchApi(`https://swapi.dev/api/planets/?page=${i}`);
        planetList.push(...data.results.map((item: planet) => item));
      }
      setNameList(planetList);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // console.log(planets?.count);
  // console.log(planets?.results.length);
  // console.log(nameList);

  return {
    nameList,
    isLoading,
    isError,
  };
}
