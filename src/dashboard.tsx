import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetList } from "react-admin";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";


// Définir un type pour les objets de postStatus
type PostStatus = {
  name: string;
  value: number;
};

const Dashboard = () => {
  // recuperation des utilisateurs et des posts
  const { data: users, isLoading: loadingUsers } = useGetList("users");
  const { data: posts, isLoading: loadingPosts } = useGetList("posts");

  const [postsPerUser, setPostsPerUser] = useState<any[]>([]);
  const [postStatus, setPostStatus] = useState<any>(null); 

  useEffect(() => {
    if (users && posts && users.length > 0 && posts.length > 0) {
      // Calculer le nombre de posts par utilisateur seulement si les données sont disponibles
      const userPostStats = users.map(user => {
        // S'assurer que les IDs sont bien des chaînes de caractères et les comparer correctement
        const postCount = posts.filter(post => String(post.authorId) === String(user.id)).length;
        return {
          name: user.name,
          posts: postCount,
        };
      });
      setPostsPerUser(userPostStats); 

      // Calculer la répartition des posts publiés et en draft
      const publishedCount = posts.filter(post => post.status === "Published").length;
      const draftCount = posts.filter(post => post.status === "Draft").length;
      setPostStatus([
        { name: "Published", value: publishedCount },
        { name: "Draft", value: draftCount }
      ]);
      
      console.log("nombre de posts par user", userPostStats); 
    }
  }, [users, posts]); 

  if (loadingUsers || loadingPosts) {
    return <Typography>Loading...</Typography>;
  }

  const maxPosts = Math.max(...postsPerUser.map(user => user.posts));
  console.log("MaxPost", maxPosts);
  

  return (
    <Card>
      <CardHeader title="Welcome to the administration" />
      <CardContent>
        <Typography>Total Users: {users?.length || 0}</Typography>
        <Typography>Total Posts: {posts?.length || 0}</Typography>

        {/* Diagramme à barres */}
        <BarChart width={500} height={300} data={postsPerUser}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, maxPosts]} />
          <Tooltip />
          <Bar dataKey="posts" fill="#8884d8" />
        </BarChart>

        {/* diagramme circulaire  */}
        {postStatus && (
          <PieChart width={400} height={300}>
            <Pie
              data={postStatus}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {postStatus.map((_entry: PostStatus, index: number) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#82cb9d" : "#ff8042"} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        )}
      </CardContent>
    </Card>
  );
};

export default Dashboard;
