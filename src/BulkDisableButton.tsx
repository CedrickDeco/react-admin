import { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from "@mui/material";
import { useNotify, useDataProvider, useRefresh, useListContext } from "react-admin";

const BulkDisableButton = () => {
	const { selectedIds = [], resource } = useListContext(); //  Récupération des `selectedIds`
	console.log("IDs sélectionnés:", selectedIds);

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

	const handleDisableUsers = async () => {
		try {
			if (selectedIds.length === 0) {
				notify("Aucun utilisateur sélectionné", { type: "warning" });
				return;
			}

      console.log("ID sélectionnés:", selectedIds);
      
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
                    data: { ...user, isActive: false }, //  Garde toutes les autres données
                    previousData: user, //  Ajout des anciennes données pour éviter leur suppression
                })
            )
        );

			notify("Utilisateurs désactivés avec succès", { type: "success" });
			refresh();
		} catch (error) {
			console.error("Erreur API:", error);
			notify("Erreur lors de la désactivation des utilisateurs", { type: "error" });
		}
		setOpen(false);
	};

	return (
		<>
			<Button onClick={handleClickOpen} color="secondary">
				Désactiver les utilisateurs sélectionnés
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Confirmation</DialogTitle>
				<DialogContent>
					Êtes-vous sûr de vouloir désactiver les utilisateurs sélectionnés ?
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Annuler
					</Button>
					<Button onClick={handleDisableUsers} color="secondary">
						Désactiver
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default BulkDisableButton;