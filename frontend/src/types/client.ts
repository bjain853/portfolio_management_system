export interface Client {
	id: string;
	firstName: string;
	lastName: string;
	clientEnrollmentDate: string;
}

// export function useGetClientProfile(clientId: number) {
//   const [client, setClient] = useState<Client>({
//     firstName: "",
//     lastName: "",
//     id: "",
//   });
//   useEffect(() => {
//     axios
//       .get(`${BasePath}/advisor/${clientId}`)
//       .then((response) => setClient(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   return client;
// }
