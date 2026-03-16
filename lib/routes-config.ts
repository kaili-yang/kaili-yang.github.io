// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
  tag?: string;
};

export const ROUTES: EachRoute[] = [
  {
    title: "Readings",
    href: "/readings",
    noLink: true,
    items: [
      {
        title: "Software architecture - The hard parts",
        href: "/software-architecture",
        noLink: true,
        items: [
          { title: "key terms", href: "/key-terms" },
          { title: "The Myth of \"Best Practices\"", href: "/note1" },
          { title: "The Microservices Lie", href: "/note2" },
          { title: "The Elephant in the Server Room", href: "/note3" },
          { title: "The Bloodbath of Breaking the Database", href: "/note4" },
          { title: "The \"Micro\" in Microservices is a Trap", href: "/note5" },
          { title: "Choreographing a Horror Story", href: "/note6" },
          { title: "The Data Mesh and Trade-offs", href: "/note7" },
          { title: "The \"Reuse is Abuse\" Dilemma", href: "/note8" },
          { title: "Who Owns the Data?", href: "/note9" },
          { title: "Dance or Direct?", href: "/note10" },
          { title: "Broken Promises and Contracts", href: "/note11" },
          { title: "The Analytical Swamp", href: "/note12" },
          { title: "Escaping the Echo Chamber", href: "/note13" },
          { title: "Drowning in the Data Lake", href: "/note14" },
          { title: "The Evangelist's Trap", href: "/note15" },
        ],
      },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
