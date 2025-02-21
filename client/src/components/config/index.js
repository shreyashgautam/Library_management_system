
export const RegisterFormControls = [
    {
      name: "userName",
      Label: "Username",
      placeholder: "Enter your username",
      type: "text",
      conponentType: "input",
    },
    {
      name: "email",
      Label: "Email",
      placeholder: "Enter your email",
      type: "email",
      conponentType: "input",
    },
    {
      name: "password",
      Label: "Password",
      placeholder: "Enter your password",
      type: "password",
      conponentType: "input",
    },
  ];
  
  export const loginFromUsername = [
   
    {
      name: "email",
      Label: "Email",
      placeholder: "Enter your email",
      type: "email",
      conponentType: "input",
    },
    {
      name: "password",
      Label: "Password",
      placeholder: "Enter your password",
      type: "password",
      conponentType: "input",
    },
  ];
  


  export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title",
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter product description",
    },
    {
      label: "Author",
      name: "Author",
      componentType: "textarea",
      placeholder: "Enter Author name",
  },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "Maths", label: "Maths" },
            { id: "Law", label: "Law" },
            { id: "Science", label: "Science" },
            { id: "Research", label: "Research" },
            { id: "Novel", label: "Novel" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "1ST FLOOR", label: "1ST FLOOR" },
            { id: "2ND FLOOR", label: "2ND FLOOR" },
            { id: "3RD FLOOR", label: "3RD FLOOR" },
            { id: "GROUND FLOOR", label: "GROUND FLOOR" },
       
        ],
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter total stock",
    },
    {
        label: "Product Link",
        name: "link",
        componentType: "input",
        type: "text",
        placeholder: "Enter product link",
    },
];



export const bookSuggestionFormElements = [
  {
      label: "Book Name",
      name: "bookName",
      componentType: "input",
      type: "text",
      placeholder: "Enter book name",
  },
  {
      label: "Author",
      name: "author",
      componentType: "input",
      type: "text",
      placeholder: "Enter author's name",
  },
  {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
          { id: "Maths", label: "Maths" },
          { id: "Law", label: "Law" },
          { id: "Science", label: "Science" },
          { id: "Research", label: "Research" },
          { id: "Novel", label: "Novel" },
      ],
  },
  {
      label: "Requested By",
      name: "requesterName",
      componentType: "input",
      type: "text",
      placeholder: "Enter your name",
  },
  {
      label: "Book Link",
      name: "bookLink",
      componentType: "input",
      type: "text",
      placeholder: "Enter book link (if available)",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "books",
    label: "Books",
    path: "/shop/listing",
  },
  
 
  
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  LAW: "LAW",
  MATHS: "MATHS",
  RESEARCH: "RESEARCH",
  SCIENCE: "SCIENCE",
  NOVEL: "NOVEL",
};

export const brandOptionsMap = {
  "1STFLOOR": "1ST FLOOR",
  "2NDFLOOR": "2ND FLOOR",
  "3RDFLOOR": "3RD FLOOR",
  "GROUNDFLOOR": "GROUND FLOOR",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "Law", label: "LAW" },
    { id: "Maths", label: "MATHS" },
    { id: "Research", label: "RESEARCH" },
    { id: "Science", label: "SCIENCE" },
    { id: "Novel", label: "NOVEL" },
  ],
  Floor: [
    { id: "1STFLOOR", label: "1ST FLOOR" },
    { id: "2NDFLOOR", label: "2ND FLOOR" },
    { id: "3RDFLOOR", label: "3RD FLOOR" },
    { id: "GROUNDFLOOR", label: "GROUND FLOOR" },
   
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];
