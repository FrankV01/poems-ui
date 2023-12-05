import styles from "../../page.module.css";
import { Container } from "react-bootstrap";
import PoemResponse from "../../../types/PoemResponse";
import SafeMarkdownToHtml from "../../../lib/SafeMarkdownToHtml";

export const dynamic = "force-dynamic";
const url = process.env.API_URL ? `${process.env.API_URL}/poem` : ""; //"http://localhost:3001/poems";

async function getData(id: number): Promise<PoemResponse> {
  if (!id || [-1, -100].includes(id)) {
    throw new Error("Given ID Not found");
  }
  if (!url) {
    throw new Error("Invalid environment configs");
  }
  console.log(`Fetching data from ${url}/${id}`);
  const res = await fetch(`${url}/${id}`, {
    //cache: "no-cache",
    //cache: "no-store",
    next: { revalidate: 3600 / 2 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(`Failed to fetch data from ${url}`);
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log(id);
  const poemData = await getData(parseInt(id));
  console.log("poemData", poemData);
  if (!poemData) {
    // or is loading?
    return (
      <main className={styles.main}>
        <Container>
          <h1>Poem not found...</h1>
        </Container>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Container>
        <h2>{poemData.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: SafeMarkdownToHtml(poemData.poem),
          }}
        />
        <div className={"small text-secondary"}>
          {poemData.id} | {new Date(poemData.createdDate).toUTCString()}
        </div>
      </Container>
    </main>
  );
}
