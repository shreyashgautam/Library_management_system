import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { House, Menu, ShoppingCart, LogOut, UserCog, FileText, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import UserCartWrapper from "../shopping-view/cart-wrapper";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { shoppingViewHeaderMenuItems } from "../config/index";
import { logout } from "../../store/auth-slice";


function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
 

  function handleNavigate(menuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      menuItem.id !== "home" &&
      menuItem.id !== "books" &&
      menuItem.id !== "search"
        ? { category: [menuItem.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter
      ? setSearchParams(new URLSearchParams(`?category=${menuItem.id}`))
      : navigate(menuItem.path);
  }

  return (
    <nav className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          key={menuItem.id}
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer transition-all duration-300 px-4 py-2 rounded-md 
                     text-[#283618] dark:text-[#FEFAE0] 
                     hover:text-[#FEFAE0] hover:bg-[#D4A373] dark:hover:bg-[#D4A373] transform hover:scale-105"
        >
          {menuItem.label}
        </Label>
      ))}
      {/* Added Rules and About Us */}
      <Label
        onClick={() => navigate("/shop/suggestions")}
        className="text-sm font-medium cursor-pointer transition-all duration-300 px-4 py-2 rounded-md 
                   text-[#283618] dark:text-[#FEFAE0] 
                   hover:text-[#FEFAE0] hover:bg-[#D4A373] dark:hover:bg-[#D4A373] transform hover:scale-105"
      >
        Rules
      </Label>
      <Label
        onClick={() => navigate("/shop/tour")}
        className="text-sm font-medium cursor-pointer transition-all duration-300 px-4 py-2 rounded-md 
                   text-[#283618] dark:text-[#FEFAE0] 
                   hover:text-[#FEFAE0] hover:bg-[#D4A373] dark:hover:bg-[#D4A373] transform hover:scale-105"
      >
        Tour
      </Label>
      
      <Label
        onClick={() => navigate("/shop/about")}
        className="text-sm font-medium cursor-pointer transition-all duration-300 px-4 py-2 rounded-md 
                   text-[#283618] dark:text-[#FEFAE0] 
                   hover:text-[#FEFAE0] hover:bg-[#D4A373] dark:hover:bg-[#D4A373] transform hover:scale-105"
      >
        About Us
      </Label>
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }
 
  return (
    <div className="flex items-center gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="ghost"
          size="icon"
          className="relative hover:bg-[#DDA15E] dark:hover:bg-[#606C38] transition"
        >
          <ShoppingCart className="w-6 h-6 text-[#283618] dark:text-[#FEFAE0]" />
          <span className="sr-only">User cart</span>
          <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems?.items?.length ? cartItems.items : []} />
        </Button>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-[#606C38] hover:ring-2 hover:ring-[#BC6C25] transition">
            <AvatarFallback className="bg-[#606C38] text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-[#FEFAE0] dark:bg-[#283618] border border-[#BC6C25]">
          <DropdownMenuLabel className="text-[#283618] dark:text-[#FEFAE0]">Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")} className="text-[#283618] hover:bg-[#DDA15E]">
            <UserCog className="mr-2 h-4 w-4" /> Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-[#DDA15E]">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#FEFAE0] dark:bg-[#283618] shadow-md py-3">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2 text-[#283618] dark:text-[#FEFAE0] font-bold text-lg">
          <House className="h-6 w-6 text-[#BC6C25]" />
          INTELLILIB
        </Link>
        <div className="hidden lg:flex gap-100">
          <MenuItems />
        </div>
        <div className="hidden lg:flex">
          <HeaderRightContent />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6 text-[#283618] dark:text-[#FEFAE0]" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-[#FEFAE0] dark:bg-[#283618]">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default ShoppingHeader;
