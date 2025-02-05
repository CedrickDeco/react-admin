import {
	List,
	Datagrid,
	TextField,
	useRecordContext,
	DateField,
	ReferenceField,
	EditButton,
	ShowButton,
	DeleteButton,
	// Filter,
	SelectInput
} from "react-admin";
import { Edit, SimpleForm, TextInput, DateInput } from "react-admin";
import { Create } from "react-admin";
import { Show, SimpleShowLayout } from "react-admin";

const PostFilters = [
	<TextInput label="Search" source="q" alwaysOn />,
	<ReferenceField label="Author" source="userId" reference="users" />,
	<SelectInput
		label="Status"
		source="status"
		choices={[
			{ id: "Published", name: "Published" },
			{ id: "Draft", name: "Draft" }
		]}
	/>
];

const StatusStyledField = (props: any) => {
	const record = useRecordContext();
	if (!record) return null;

	return (
		<TextField
			{...props}
			sx={{
				color: record.status === "Published" ? "green" : "gray"
			}}
		/>
	);
};

export const PostList = () =>
	<List filters={PostFilters}>
		<Datagrid rowClick="edit">
			<TextField source="title" />
			<ReferenceField source="authorId" reference="users">
				<TextField source="name" />
			</ReferenceField>
			<DateField source="publishedAt" />
			<StatusStyledField source="status" />
			<EditButton />
			<ShowButton />
			<DeleteButton />
		</Datagrid>
	</List>;

// <List filters={<PostFilters />}>
// 	<Datagrid>
// 		{/* <TextField source="id" /> */}
// 		<TextField source="title" />
// 		<ReferenceField source="authorId" reference="users">
// 			<TextField source="name" />
// 		</ReferenceField>
// 		<DateField source="publishedAt" />
// 		<TextField source="status" />
// 		<EditButton />
// 		<ShowButton />
// 		<DeleteButton />
// 	</Datagrid>
// </List>;

export const PostEdit = () =>
	<Edit>
		<SimpleForm>
			<TextInput source="title" />
			<DateInput source="publishedAt" />
			<TextInput source="status" />
		</SimpleForm>
	</Edit>;

export const PostCreate = () =>
	<Create>
		<SimpleForm>
			<TextInput source="title" />
			<DateInput source="publishedAt" />
			<TextInput source="status" />
		</SimpleForm>
	</Create>;

export const PostShow = () =>
	<Show>
		<SimpleShowLayout>
			<TextField source="title" />
			<ReferenceField source="authorId" reference="users">
				<TextField source="name" />
			</ReferenceField>
			<DateField source="publishedAt" />
			<TextField source="status" />
		</SimpleShowLayout>
	</Show>;
