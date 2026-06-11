import { connectDB } from '@/app/lib/db';
import PortfolioWorkModel from '@/app/lib/models/PortfolioWork';
import ProductModel from '@/app/lib/models/Product';

import Hero from '../components/protfolio-com/hero/hero';
import Work from '../components/protfolio-com/work/Work';
import Idea from '../components/protfolio-com/idea/Idea';
import Thought from '../components/industries-com/Thought/Thought';

export const revalidate = 86400;

const ITEMS_PER_PAGE = 9;

async function getPortfolioPageData() {
  await connectDB();

  const [portfolioItems, totalPortfolio, products] = await Promise.all([
    PortfolioWorkModel.find({}).sort({ order: 1 }).skip(0).limit(ITEMS_PER_PAGE).lean(),
    PortfolioWorkModel.countDocuments({}),
    ProductModel.find({}).sort({ order: 1 }).lean(),
  ]);

  return JSON.parse(JSON.stringify({
    portfolioItems,
    totalPages: Math.ceil(totalPortfolio / ITEMS_PER_PAGE),
    products,
  }));
}

export default async function PortfolioPage() {
  const { portfolioItems, totalPages, products } = await getPortfolioPageData();

  return (
    <>
      <Hero />
      <Work initialItems={portfolioItems} initialTotalPages={totalPages} />
      <Idea products={products} />
      <Thought />
    </>
  );
}
