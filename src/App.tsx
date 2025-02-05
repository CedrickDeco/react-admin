import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { PostList, PostEdit, PostCreate, PostShow } from "./posts";
import { UserList, UserEdit, UserCreate, UserShow } from "./users";
import Dashboard from "./dashboard";
import { ThemeProvider } from "./ThemeProvider";

const App = () =>
	<ThemeProvider>
		<Admin
			disableTelemetry
			dataProvider={dataProvider}
			dashboard={Dashboard}
		>
			<Resource
				name="posts"
				list={PostList}
				edit={PostEdit}
				create={PostCreate}
				show={PostShow}
			/>
			<Resource
				name="users"
				list={UserList}
				edit={UserEdit}
				create={UserCreate}
				show={UserShow}
			/>
		</Admin>;
	</ThemeProvider>;

export default App;
