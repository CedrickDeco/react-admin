import {
	List,
	Datagrid,
	TextField,
	EmailField,
	EditButton,
	DeleteButton,
	ShowButton,
	BooleanField
} from "react-admin";
import { Edit, SimpleForm, TextInput } from "react-admin";
import { Create } from "react-admin";
import { Show, SimpleShowLayout } from "react-admin";
import BulkActionButtons from "./BulkActionButtons";

export const UserList = () =>
	<List>
		{/* <Datagrid> */}
		<Datagrid bulkActionButtons={<BulkActionButtons />}>
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="username" />
			<EmailField source="email" />
			<TextField source="phone" />
			<TextField source="website" />
			<BooleanField source="isActive" label="Statut" />
			<EditButton />
			<ShowButton />
			<DeleteButton />
		</Datagrid>
	</List>;

export const UserEdit = () =>
	<Edit>
		<SimpleForm>
			<TextInput source="name" />
			<TextInput source="username" />
			<TextInput source="email" />
			<TextInput source="phone" />
			<TextInput source="website" />
		</SimpleForm>
	</Edit>;

export const UserCreate = () =>
	<Create>
		<SimpleForm>
			<TextInput source="name" />
			<TextInput source="username" />
			<TextInput source="email" />
			<TextInput source="phone" />
			<TextInput source="website" />
		</SimpleForm>
	</Create>;

export const UserShow = () =>
	<Show>
		<SimpleShowLayout>
			<TextField source="name" />
			<TextField source="username" />
			<EmailField source="email" />
			<TextField source="phone" />
			<TextField source="website" />
		</SimpleShowLayout>
	</Show>;
