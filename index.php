<?php ini_set('default_charset', "utf-8"); ?>
<!DOCTYPE html>
<html lang="fr-FR">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

	<!-- title / desc / keywords-->
	<title>Calcul immobilier</title>
	<meta name="description" content="Calculez le rendement net d'un investissement locatif immobilier, impôts compris." />
	<meta name="keywords" content="rendement immobilier locatif" />

	<!-- robots -->
	<meta name="robots" content="all" />
	<meta name="revisit-after" content="7 days" />

	<!-- website infos -->
	<meta name="author" content="Benoit Guiraudou" />

	<!-- affichage -->
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no">
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<!--[if lt IE 9]><meta http-equiv="X-UA-Compatible" content="IE=edge" /><![endif]-->

	<!-- icons & favicon -->
	<link rel="icon" type="image/x-icon" href="favicon.ico" />

	<!-- Style -->

	<link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

	<!-- <link href="https://fonts.googleapis.com/css?family=Inter:400,500,700&display=swap" rel="stylesheet"> -->
	<!-- <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,700&display=swap" rel="stylesheet"> -->
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet">
	<!-- <link href="https://fonts.googleapis.com/css?family=Fredoka+One&display=swap" rel="stylesheet"> -->
	<link href="https://fonts.googleapis.com/css?family=Indie+Flower&display=swap" rel="stylesheet">

	<link href="./css/style.css" rel="stylesheet">
</head>
<body>
	<header>
		<div class="container">
			<img src="logo.png" alt="" />
			<h1>Rendement locatif</h1>
			<div class="clearfix"></div>
		</div>
	</header>
	<div class="corps container">
		<div class="panel panel-default">
			<div class="panel-body">
				<form class="form-horizontal">
					<fieldset>
						<legend>Bien immobilier</legend>
						<div class="form-group">
							<label class="col-sm-4 control-label"><span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Valeur du bien, frais d'agence inclus (FAI), sans les frais d'aquisition." data-original-title="" title=""></span> Valeur du bien :</label>
							<div class="col-sm-8 form-inline">
								<div class="input-group">
									<input type="text" name="montant_bien" class="form-control text-right" size="10" value="" />
									<div class="input-group-addon">EUR</div>
								</div>
								&nbsp; (FAI)
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4 control-label"><span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Montant du loyer net, hors charges. Les charges seront automatiquement calculées et ajoutées au loyer." data-original-title="" title=""></span> Loyer :</label>
							<div class="col-sm-8 form-inline">
								<div class="input-group">
									<input type="text" name="loyer" class="form-control text-right" size="10" />
									<div class="input-group-addon">EUR / mois</div>
								</div>
								&nbsp; (hors charges)
							</div>
						</div>
					</fieldset>
					<fieldset>
						<legend>Crédit</legend>
						<div class="form-group">
							<label class="col-sm-4 control-label">Montant crédit :</label>
							<div class="col-sm-8 form-inline">
								<div class="input-group">
									<input type="text" name="montant_credit" class="form-control text-right" size="10" />
									<div class="input-group-addon">EUR</div>
								</div>
								&nbsp; au taux de &nbsp;
								<div class="input-group">
									<input type="text" name="taux_credit" class="form-control text-right" size="5" />
									<div class="input-group-addon">%</div>
								</div>
								&nbsp; sur &nbsp;
								<div class="input-group">
									<select name="duree_credit" class="form-control"></select>
									<div class="input-group-addon">an</div>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4 control-label">Assurance crédit :</label>
							<div class="col-sm-8 form-inline">
								<div class="input-group">
									<input type="text" name="assurance_credit" class="form-control text-right" size="10" />
									<div class="input-group-addon">EUR / mois</div>
								</div>
							</div>
						</div>
					</fieldset>
					<fieldset>
						<legend>Charges</legend>
						<div class="form-group">
							<label class="col-sm-4 control-label"><span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Montant total annuelle de la taxe foncière, tel qu'indiqué sur l'avis, c'est-à-dire comprenant la taxe sur l'enlèvement des ordures ménagères (TEOM)" data-original-title="" title=""></span> Taxe foncière :</label>
							<div class="col-sm-8 form-inline">
								<div class="input-group">
									<input type="text" name="taxe_fonciere" class="form-control text-right" size="10" />
									<div class="input-group-addon">EUR / an</div>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4 control-label"><span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Montant annuel de l'assurance &quot;Propriétaire non occupant&quot; (PNO), obligatoire pour tout bien mis en location." data-original-title="" title=""></span> Assurance PNO :</label>
							<div class="col-sm-8 form-inline">
								<div class="input-group">
									<input type="text" name="assurance_pno" class="form-control text-right" size="10" />
									<div class="input-group-addon">EUR / an</div>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4 control-label"><span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Montant total annuel des charges de copropriété (incluant les éventuelles charges pouvant être récupérées par le locataire). Puis montant mensuel des charges de copropriété récupérables, c'est-à-dire les dépenses d'entretien (ménage, escalier, ascenceur), les menues réparations,..." data-original-title="" title=""></span> Charges copropriété :</label>
							<div class="col-sm-8 form-inline">
								<div class="input-group">
									<input type="text" name="charges_copro" class="form-control text-right" size="10" />
									<div class="input-group-addon">EUR / an</div>
								</div>
								&nbsp; dont récupérable &nbsp;
								<div class="input-group">
									<input type="text" name="charges_copro_recuperable" class="form-control text-right" size="5" />
									<div class="input-group-addon">EUR / mois</div>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4 control-label"><span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Les frais de gestion locative correpondent aux honoraires pour la prise en charge de la gestion du bien immobilier à la location par un intervenant extérieur (agence). Ils varient entre 4,8 et 9,6 % du loyer.<br>La garantie loyers impayés (GLI) est une assurance contre les éventuels impayés de loyers et charges et contre les dégradations dont le locataire pourrait être l'auteur.<br>Les frais de la mise en location correspondent aux honoraires de l'agent immobilier (pour la visite du logement, la création du dossier et la rédaction du bail). Ils sont calculés avec un changement de locataire tous les trois ans." data-original-title="" title=""></span> Frais de gestion et GLI :</label>
							<div class="col-sm-8 form-inline checkbox">
								<label><input type="checkbox" name="frais_gestion_locative_enabled"> Gestion locative en agence</label> &nbsp;
								<label><input type="checkbox" name="frais_gli_enabled"> Garantie des loyers impayés (GLI)</label> &nbsp;
								<label><input type="checkbox" name="frais_mise_en_location_enabled"> Mise en location</label> &nbsp;
							</div>
						</div>
					</fieldset>
					<div class="row">
					<div class="col-md-6">
						<fieldset>
							<legend>Revenus</legend>
							<div class="form-group">
								<label class="col-sm-4 control-label"><span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Salaire mensuel et autres revenus mensuels (dividendes,...). S'il y a un 13ème mois, il faut l'inclure en effectuant le calcul suivant : <code>(salaire mensuel * 13) / 12</code>" data-original-title="" title=""></span> Salaire mensuel :</label>
								<div class="col-sm-8 form-inline">
									<div class="input-group">
										<input type="text" name="salaire_mensuel" class="form-control text-right" size="10" />
										<div class="input-group-addon">EUR / mois</div>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-4 control-label"><span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Somme totale de tous les autres revenus fonciers mensuels des biens déjà aquis." data-original-title="" title=""></span> Revenus fonciers :</label>
								<div class="col-sm-8 form-inline">
									<div class="input-group">
										<input type="text" name="revenu_fonctier_actuel" class="form-control text-right" size="10" />
										<div class="input-group-addon">EUR / mois</div>
									</div>
									&nbsp; (hors charges)
								</div>
							</div>
						</fieldset>
					</div>
					<div class="col-md-6">
						<fieldset>
							<legend>Loyers &amp; Crédits en cours</legend>
							<div class="form-group">
								<label class="col-sm-4 control-label"><span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Loyer (mensuel) de la résidence principale, si locataire. Si propriétaire, laisser vide." data-original-title="" title=""></span> Loyer R.P. :</label>
								<div class="col-sm-8 form-inline">
									<div class="input-group">
										<input type="text" name="loyer_residence_principale" class="form-control text-right" size="10" />
										<div class="input-group-addon">EUR / mois</div>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-4 control-label"><span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Somme totale de tous les autres crédits en cours (crédit immobilier, crédit auto, crédit conso,...) y compris celui de la résidence principale si propriétaire." data-original-title="" title=""></span> Mensualités crédits :</label>
								<div class="col-sm-8 form-inline">
									<div class="input-group">
										<input type="text" name="credit_actuel_mensualite" class="form-control text-right" size="10" />
										<div class="input-group-addon">EUR / mois</div>
									</div>
								</div>
							</div>
						</fieldset>
						</div>
					</div>
					<p class="text-center no-margin">
						<button class="btn btn-info" name="validate">Valider</button>
					</p>
				</form>
			</div>
		</div>

		<div class="panel panel-default result_infos hide">
			<div class="panel-body">
				<div class="params_infos">
					<p class="pull-right">
						<a href="#" class="edit_params btn btn-xs btn-info" title="Modifier ces paramètres">Modifier</a>
					</p>
					<p>Achat d'un bien au prix de <span class="bold montant_bien"></span> FAI, financé par un emprunt de <span class="bold montant_credit"></span> (taux <span class="taux_credit"></span>) sur <span class="bold duree_credit"></span> mois, loué <span class="bold loyer"></span> (hors-charges) par mois.</p>
					<div class="clearfix"></div>
				</div>

				<div class="panel-group">
					<div class="row">
						<div class="col-xs-6 col-sm-3">
							<div class="panel panel-default">
								<div class="panel-body text-center">
									<p>
										Rendement brut
										<span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="right" data-content="Le rendement brut correspond à la rentabilité sans tenir compte des charges ou de la fiscalité. Le prix d’achat dans le calcul comprends le prix d’achat du bien avec les frais d’acquisition." data-original-title="" title=""></span>
									</p>
									<span class="recap_value rendement_brut"></span>
								</div>
							</div>
						</div>
						<div class="col-xs-6 col-sm-3">
							<div class="panel panel-default">
								<div class="panel-body text-center">
									<p>
										Rendement locatif net 
										<span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="right" data-content="Le rendement locatif net d'impôt correspond à la rentabilité en tenant compte de tous les frais, charges et impôts. Le prix d’achat dans le calcul comprends en plus le coût du crédit. Ici la valeur correspondant au rendement de l'année 2 (l'année 1 étant particulière)." data-original-title="" title=""></span>
									</p>
									<span class="recap_value rendement_net"></span>
								</div>
							</div>
						</div>
						<div class="col-xs-6 col-sm-3">
							<div class="panel panel-default">
								<div class="panel-body text-center">
									<p>Mensualité crédit</p>
									<span class="recap_value mensualite_credit"></span>
								</div>
							</div>
						</div>
						<div class="col-xs-6 col-sm-3">
							<div class="panel panel-default">
								<div class="panel-body text-center">
									<p>
										Cash flow
										<span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="right" data-content="Le cash flow est le montant restant à la fin du mois une fois que toutes les charges et impôts sont payés. C'est le bénéfice si positif ou l'effort d'épargne si négatif. Ici la valeur correspond au cash flow mensuel de l'année 2 (l'année 1 étant particulière)." data-original-title="" title=""></span>
									</p>
									<span class="recap_value cash_flow_annee_2"></span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="table-responsive">
					<table class="table table-condensed table-hover year_list">
						<thead>
							<tr>
								<th class="text-right">Année</th>
								<th class="number_value">
									<span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Loyer charges comprises (comprenant les charges de copropriété récupérables et la taxe sur l'enlèvement des ordures ménagères)" data-original-title="" title=""></span>
									Loyer
								</th>
								<th class="number_value">Crédit (capital)</th>
								<th class="number_value">Crédit (intérêts)</th>
								<th class="number_value">
									<!-- <span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Sommes des charges à payer (charges de copropriété non récupérables, taxe foncière sans la TOEM, assurance PNO, assurance crédit, frais de gestion locative, assurance loyers impayés)" data-original-title="" title=""></span> -->
									<span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Sommes des charges à payer (charges de copropriété, taxe foncière, assurance PNO, assurance crédit, frais de gestion locative, assurance loyers impayés). Une partie de ces charges est récupérable (payée) par le locataire." data-original-title="" title=""></span>
									Charges
								</th>
								<th class="number_value">Impôt + P.S.</th>
								<th class="number_value">Cash flow</th>
								<th class="text-right"></th>
							</tr>
						</thead>
						<tbody></tbody>
						<tfoot>
							<tr>
								<td colspan="8"></td>
							</tr>
						</tfoot>
					</table>
				</div>

				<div class="panel-group no-margin">
					<div class="row">
						<div class="col-xs-6 col-sm-3">
							<div class="panel panel-default">
								<div class="panel-body text-center">
									<p>Frais d'acquisition</p>
									<span class="recap_value frais_acquisition"></span>
								</div>
							</div>
						</div>
						<div class="col-xs-6 col-sm-3">
							<div class="panel panel-default">
								<div class="panel-body text-center">
									<p>Coût du crédit</p>
									<span class="recap_value cout_credit"></span>
								</div>
							</div>
						</div>
						<div class="col-xs-6 col-sm-3">
							<div class="panel panel-default">
								<div class="panel-body text-center">
									<p>Apport personnel</p>
									<span class="recap_value apport_personnel"></span>
								</div>
							</div>
						</div>
						<div class="col-xs-6 col-sm-3">
							<div class="panel panel-default">
								<div class="panel-body text-center">
									<p>Taux d'endettement</p>
									<span class="recap_value taux_endettement"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="detail_year_base hide">
			<div class="panel panel-default">
				<div class="panel-body">
					<div class="row">
						<div class="col-xs-6 col-sm-4">
							<p class="text-center"><strong>Récapitulatif de l'année</strong></p>
							<table class="table table-condensed no-margin table-small table-borderless">
								<!-- <tr>
									<td class="text-right">&nbsp;</td>
									<td class="text-right"></td>
									<td></td>
								</tr> -->
								<tr>
									<td class="text-right">
										<span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Total des loyers mensuels hors charges." data-original-title="" title=""></span>
										Revenus fonciers :
									</td>
									<td class="text-right revenus_fonciers_annee"></td>
									<td class="text-left"></td>
								</tr>
								<tr>
									<td class="text-right">
										<span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Somme de toutes les charges déductibles des revenus fonciers, pour le calcul de l'impôt (charges de copropriété non récupérables, intérêts d'emprunt, assurances,...)." data-original-title="" title=""></span>
										Charges déductibles :
									</td>
									<td class="text-right total_charges_deductibles_annee"></td>
									<td></td>
								</tr>
								<tr>
									<td class="text-right">Crédit (capital) :</td>
									<td class="text-right credit_capital_annee"></td>
									<td></td>
								</tr>
								<tr>
									<td class="text-right">
										<span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Montant de l'impôt sur les revenus fonciers généré, en tenant compte de la CSG déductible." data-original-title="" title=""></span>
										Impôt sur le revenu :
									</td>
									<td class="text-right impot_revenu_annee"></td>
									<td></td>
								</tr>
								<tr>
									<td class="text-right">Prélèvements sociaux :</td>
									<td class="text-right prelevement_sociaux_annee"></td>
									<td></td>
								</tr>
								<tr class="border-top bold">
									<td class="text-right text">Bénéfice foncier :</td>
									<td class="text-right benefice_foncier_annee"></td>
									<td></td>
								</tr>
								<tr class="no-border bold">
									<td class="text-right text">Cash flow :</td>
									<td class="text-right cash_flow_annee"></td>
									<td></td>
								</tr>
							</table>
						</div>
						<div class="col-xs-6 col-sm-4">
							<p class="text-center"><strong>Récapitulatif mensuel (moyenne)</strong></p>
							<table class="table table-condensed no-margin table-small table-borderless">
								<!-- <tr>
									<td class="text-right">&nbsp;</td>
									<td class="text-right"></td>
									<td></td>
								</tr> -->
								<tr>
									<td class="text-right">Loyer :</td>
									<td class="text-right">
										<span class="loyer"></span><br>
										<!-- dont <span class="charges_recuperable"></span> de charges -->
									</td>
									<td class="text-left"></td>
								</tr>
								<tr>
									<td class="text-right">Mensualité crédit :</td>
									<td class="text-right credit_mensualite"></td>
									<td></td>
								</tr>
								<tr>
									<td class="text-right">Charges :</td>
									<td class="text-right total_charges_par_mois"></td>
									<td></td>
								</tr>
								<tr>
									<td class="text-right">Impôt sur le revenu :</td>
									<td class="text-right impot_revenu_par_mois"></td>
									<td></td>
								</tr>
								<tr>
									<td class="text-right">Prélèvements sociaux :</td>
									<td class="text-right prelevement_sociaux_par_mois"></td>
									<td></td>
								</tr>
								<tr class="border-top bold">
									<td class="text-right text">Cash flow :</td>
									<td class="text-right cash_flow_par_mois"></td>
									<td></td>
								</tr>
							</table>
						</div>
						<!-- <div class="clearfix visible-xs"></div> -->
						<div class="col-xs-6 col-sm-4">
							<br class="visible-xs">
							<p class="text-center"><strong>Détails des charges déductibles</strong></p>
							<table class="table table-condensed no-margin table-small table-borderless">
								<tr>
									<td class="text-right">
										<span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Taxe foncière sans la taxe sur l'enlèvement des ordures ménagères (récupérable par le locataire)." data-original-title="" title=""></span>
										Taxe foncière (hors TEOM) :
									</td>
									<td class="text-right taxe_fonciere"></td>
								</tr>
								<tr>
									<td class="text-right">Assurance PNO :</td>
									<td class="text-right assurance_pno"></td>
								</tr>
								<tr>
									<td class="text-right">
										<span type="button" class="glyphicon glyphicon-info-sign" aria-hidden="true" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="Charges copropriété avec déduction des charges récupérables (payées par le locataire)." data-original-title="" title=""></span>
										Charges copro (non récup.) :
									</td>
									<td class="text-right charges_copro"></td>
								</tr>
								<tr>
									<td class="text-right">Crédit (intérets) :</td>
									<td class="text-right credit_interets"></td>
								</tr>
								<tr>
									<td class="text-right">Assurance crédit :</td>
									<td class="text-right assurance_credit"></td>
								</tr>
								<tr class="hide">
									<td class="text-right">Gestion locative :</td>
									<td class="text-right frais_gestion_locative"></td>
								</tr>
								<tr class="hide">
									<td class="text-right">Garantie des loyers impayés :</td>
									<td class="text-right frais_gli"></td>
								</tr>
								<tr class="hide">
									<td class="text-right">Frais de mise en location :</td>
									<td class="text-right frais_mise_en_location"></td>
								</tr>
								<tr class="hide">
									<td class="text-right">Frais d'acquisition :</td>
									<td class="text-right frais_acquisition_deductibles"></td>
								</tr>
								<tr class="border-top bold">
									<td class="text-right text">Total charges déductibles :</td>
									<td class="text-right total_charges_deductibles_annee"></td>
								</tr>
							</table>
						</div>
					</div>
					<hr>
					<p class="text-center"><strong>Détail par mois de l'année <span class="year"></span></strong></p>
					<div class="table-responsive">
						<table class="table table-condensed table-hover table-small month_list no-margin">
							<thead>
								<tr>
									<th class="text-right">Mois</th>
									<th class="number_value">Loyer</th>
									<th class="number_value">Crédit (capital)</th>
									<th class="number_value">Crédit (intérêts)</th>
									<th class="number_value">Charges</th>
									<th class="number_value">Impôt + P.S.</th>
									<th class="number_value">Cash flow</th>
								</tr>
							</thead>
							<tbody></tbody>
							<tfoot>
								<tr>
									<td colspan="7"></td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>

	</div>
	<footer>
		<div class="container">
			Made with ❤ by <a href="https://twitter.com/benfett">Benoit Guiraudou</a>. Contribute to this project on <a href="https://github.com/guiraudou/rendement-locatif">GitHub</a>.
		</div>
	</footer>

	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=" crossorigin="anonymous"></script>
	<!-- <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script> -->
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>

	<script src="js/helpers.js"></script>
	<script src="js/app.js"></script>

	<script type="text/javascript">
		var locale = 'fr-FR';
		var currency = 'EUR';
	</script>
</body>
</html>