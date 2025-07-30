import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

export type PageType =
  | "start"
  | "introduction"
  | "listing"
  | "details"
  | "auction"
  | "registration"
  | "docs"
  | "finish";

export interface AuctionData {
  id: number;
  title: string;
  price: number;
  type: "apartment" | "parking" | "commercial";
}

export interface PropertyDetails {
  id: number;
  type: "apartment" | "parking" | "commercial";
  title: string;
  price: string;
  area?: string;
  rooms?: number;
  mainImage: string;
  thumbnails: string[];
  advantages: string[];
}

interface PageContextType {
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
  auctionData: AuctionData | null;
  setAuctionData: (data: AuctionData | null) => void;
  propertyDetails: PropertyDetails | null;
  setPropertyDetails: (data: PropertyDetails | null) => void;
  activePropertyType: "apartment" | "parking" | "commercial";
  setActivePropertyType: (type: "apartment" | "parking" | "commercial") => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};

interface PageProviderProps {
  children: ReactNode;
}

export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>("start");
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [propertyDetails, setPropertyDetails] =
    useState<PropertyDetails | null>(null);
  const [activePropertyType, setActivePropertyType] = useState<
    "apartment" | "parking" | "commercial"
  >("apartment");

  const navigateTo = useCallback((page: PageType) => {
    setCurrentPage(page);
  }, []);

  const contextValue = useMemo(
    () => ({
      currentPage,
      navigateTo,
      auctionData,
      setAuctionData,
      propertyDetails,
      setPropertyDetails,
      activePropertyType,
      setActivePropertyType,
    }),
    [
      currentPage,
      navigateTo,
      auctionData,
      setAuctionData,
      propertyDetails,
      setPropertyDetails,
      activePropertyType,
      setActivePropertyType,
    ]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
};
