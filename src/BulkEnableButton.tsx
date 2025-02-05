import { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from "@mui/material";
import { useNotify, useDataProvider, useRefresh, useListContext } from "react-admin";

const BulkEnableButton = () => {
	const { selectedIds = [], resource } = useListContext(); // Récupération des `selectedIds`
	console.log("IDs sélectionnés pour activation:", selectedIds);

	const [open, setOpen] = useState(false);
	const notify = useNotify();
	const refresh = useRefresh();
	const dataProvider = useDataProvider();

	const handleClickOpen = () => {
		if (selectedIds.length === 0) {
			notify("Aucun utilisateur sélectionné", { type: "warning" });
			return;
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEnableUsers = async () => {
		try {
			if (selectedIds.length === 0) {
				notify("Aucun utilisateur sélectionné", { type: "warning" });
				return;
			}

			console.log("ID sélectionnés pour activation:", selectedIds);

      // Récupérer les données existantes avant la mise à jour
        const users = await Promise.all(
            selectedIds.map(async (id) => {
                const { data } = await dataProvider.getOne(resource, { id });
                return { id, ...data }; //  Garde toutes les autres données
            })
        );
      
      await Promise.all(
            users.map((user) =>
                dataProvider.update(resource, {
                    id: user.id,
                    data: { ...user, isActive: true }, //  Garde toutes les autres données
                    previousData: user, //  Ajout des anciennes données pour éviter leur suppression
                })
            )
        );


			notify("Utilisateurs activés avec succès", { type: "success" });
			refresh();
		} catch (error) {
			console.error("Erreur API:", error);
			notify("Erreur lors de l'activation des utilisateurs", { type: "error" });
		}
		setOpen(false);
	};

	return (
		<>
			<Button onClick={handleClickOpen} color="primary">
				Activer les utilisateurs sélectionnés
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Confirmation</DialogTitle>
				<DialogContent>
					Êtes-vous sûr de vouloir activer les utilisateurs sélectionnés ?
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="secondary">
						Annuler
					</Button>
					<Button onClick={handleEnableUsers} color="primary">
						Activer
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default BulkEnableButton;
