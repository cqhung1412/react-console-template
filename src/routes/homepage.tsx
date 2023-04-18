import { QueryClient, useIsFetching, useQuery } from "@tanstack/react-query";
import { createContact, getContacts } from "../mock-contacts";
import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useDebounce } from "rooks";

const contactListQuery = (q?: string) => ({
  queryKey: ["contacts", "list", q ?? "all"],
  queryFn: () => getContacts(q),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") as string;
    if (!queryClient.getQueryData(contactListQuery(q).queryKey)) {
      await queryClient.fetchQuery(contactListQuery(q));
    }
    return { q };
  };

export const action = (queryClient: QueryClient) => async () => {
  const contact = await createContact();
  queryClient.invalidateQueries({ queryKey: ["contacts", "list"] });
  return contact;
};

export default function Homepage() {
  const { q } = useLoaderData() as any;
  const { data: contacts } = useQuery(contactListQuery(q));
  const searching = useIsFetching(["contacts", "list"]) > 0;
  const navigation = useNavigation();
  const submit = useSubmit();

  const debouncedSubmit = useDebounce(submit, 500);

  return (
    <>
      <div>Hi</div>
    </>
  );
}
