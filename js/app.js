// ------------------------------------------------------------------------------------------
// 									VALEUR PAR DEFAUT
// ------------------------------------------------------------------------------------------

// Valeur du bien FAI (en EUR)
var montantBien;

// Loyer (en EUR / mois)
var loyer;

// Montant crédit (en EUR)
var montantCredit;

// Taux crédit (en %)
var tauxCredit = 1.25;

// Durée crédit (en années)
var dureeCredit = 20;

// Assurance crédit (en EUR / mois)
var assuranceCredit = 20;

// Taxe foncière (en EUR / an)
var taxeFonciere = 900;

// Assurance PNO (en EUR / an)
var assurancePno = 80;

// Charges copro total (en EUR / an)
var chargesCoproAnnee = 1000;

// Charges copro récupérable (en EUR / mois)
var chargesCoproRecuperableMensuelle = 30;

// Salaire mensuel. Si sur 13 mois, faire le calcul suivant : (<salaire mensuel> * 13) / 12
var salaireMensuel;

// Loyer de la résidence principale
var loyerResidencePrincipale;

// Total des mensualités des crédits en cours
var creditActuelMensualite;

// Total des revenus fonciers (hors charges, non pondérés)
var revenuFonctierActuel;

var gestion;


// ------------------------------------------------------------------------------------------
// 									PARAMÈTRES
// ------------------------------------------------------------------------------------------

// Pourcentage des frais de notaires en fonction du montant du bien
var FRAIS_NOTAIRE_PERCENT = 0.08;
// Frais fixe de dossier pour l'emprunt bancaire, en euros
var FRAIS_DOSSIER_CREDIT = 800;
// Frais fixe de cautionnement pour l'emprunt bancaire, en euros (environ 200 EUR)
var FRAIS_FIXE_CAUTIONNEMENT = 200;
// Pourcentage de la comission de caution en fonction du montant emprunté (en moyenne de 150 à 600 EUR)
var COMMISSION_CAUTION_PERCENT = 0.002;
// Pourcentage de la participation au FMG en fonction du montant emprunté (en moyenne environ 0,8% du capital emprunté)
var PARTICIPATION_FMG_PERCENT = 0.008;
// Pourcentage de la participation au FMG reversé à l'emprunteur à la fin du remboursement
var PARTICIPATION_FMG_REVERSE_PERCENT = 0.5;

// Taux des prélèvement sociaux (17,20% en 2019)
var PRELEVEMENT_SOCIAUX_PERCENT = 0.172;
// Taux de la CSG déductible (6,80% en 2019)
var CSG_DEDUCTIBLE_PERCENT = 0.068;

// Taux revalorisation
var TAUX_REVALORISATION_LOYER = 0.01;
var TAUX_REVALORISATION_TAXE_FONCIERE = 0.01;
var TAUX_REVALORISATION_ASSURANCE_PNO = 0.01;
var TAUX_REVALORISATION_CHARGES_COPRO = 0.02;

// Pourcentage de la taxe enlèvement ordure ménagère par rapport à la taxe foncière (environ 25% en moyenne)
var TAXE_ELEVEMENT_ORDURES_MENAGERES_PERCENT = 0.25;

// Pourcentage des frais de gestion locative en fonction du montant du loyer (varie entre 4,8 et 9,6 %)
var GESTION_LOCATIVE_PERCENT = 0.072;
// Pourcentage des frais de garantie des loyers impayés en fonction du montant du loyer (varie entre 1,8 et 3,2 %)
var GARANTIE_LOYERS_IMPAYES_PERCENT = 0.025;
// Pourcentage des frais de mise en location en fonction du montant des loyers annuels (coût annuel de 1,5 % à 4,4 % des loyers annuels). Changement de locataire tous les 3 ans
var MISE_EN_LOCATION_PERCENT = 0.027;

// ------------------------------------------------------------------------------------------
// 									SCRIPT
// ------------------------------------------------------------------------------------------

// https://www.rendementlocatif.com/calcul/rendement#/calcul/type_appartement,neuf_0,prix_175000,travauxr_0,surface_40,villevalue_Poissy%20(78300),ville_Poissy%7C78300,loyer_850,loyerannuel_10200,chargest_800,chargesr_21,travauxa_0,tf_800,regime_rr,mbles_0,dureeanah_6,prime_0,revenus_,revenus2_,parts_1,enfants_0,emprunt_on,apport_11056,duree_22,tauxemprunt_1.25,assurance_0.36,fraisdossier_950,creditlogement_2292,agence_7,agenceeuros_9755,fraisg_0,fraisrecherche_0,assuranceli_0,tauxmois_0,tauxan_1,pno_0,valorisation_0.1,valorisationc_2,valorisations_0.5,typeemprunt_amorti,fraisnotaire_,tauxmi_30,tauxps_17.2,reventeannee_2,reventeprix_,aId_,

$(function() {
	var form = $('form');
	var divInfosParams = $('div.params_infos');
	var divInfosResult = $('div.result_infos');

	function updateData() {
		console.log('updateData');

		// var taxeFonciere = form.find('input[name="taxe_fonciere"]').val() / 12;

		// Récup valeurs
		// Bien
		let montantBien = parseFloat(form.find('[name="montant_bien"]').val());
		let loyerBase = parseFloat(form.find('[name="loyer"]').val());
		// Crédit
		let montantCredit = parseFloat(form.find('[name="montant_credit"]').val());
		let tauxCredit = parseFloat(form.find('[name="taux_credit"]').val());
		let dureeCredit = parseInt(form.find('[name="duree_credit"]').val());
		let assuranceCredit = parseFloat(form.find('[name="assurance_credit"]').val() || 0);
		// Charges
		let taxeFonciereBase = parseFloat(form.find('[name="taxe_fonciere"]').val() || 0);
		let assurancePnoBase = parseFloat(form.find('[name="assurance_pno"]').val() || 0);
		let chargesCoproBase = parseFloat(form.find('[name="charges_copro"]').val() || 0);
		let chargesCoproRecuperableBase = parseFloat(form.find('[name="charges_copro_recuperable"]').val() || 0);
		// Revenus et crédits en cours
		let salaireMensuel = parseFloat(form.find('[name="salaire_mensuel"]').val() || 0);
		let loyerResidencePrincipale = parseFloat(form.find('[name="loyer_residence_principale"]').val() || 0);
		let creditActuelMensualite = parseFloat(form.find('[name="credit_actuel_mensualite"]').val() || 0);
		let revenuFonctierActuel = parseFloat(form.find('[name="revenu_fonctier_actuel"]').val() || 0);
		let trancheMarginaleImposition = 0.3; // todo : add form

		let fraisGestionLocativeEnabled = (form.find('[name="frais_gestion_locative_enabled"]:checked').length > 0);
		let fraisGliEnabled = (form.find('[name="frais_gli_enabled"]:checked').length > 0);
		let fraisMiseEnLocationEnabled = (form.find('[name="frais_mise_en_location_enabled"]:checked').length > 0);

		// Sauvegarde données dans cookies
		// Bien
		createCookie('montant_bien', montantBien, 30);
		createCookie('loyer', loyerBase, 30);
		// Crédit
		createCookie('montant_credit', montantCredit, 30);
		createCookie('taux_credit', tauxCredit, 30);
		createCookie('duree_credit', dureeCredit, 30);
		createCookie('assurance_credit', assuranceCredit, 30);
		// Charges
		createCookie('taxe_fonciere', taxeFonciereBase, 30);
		createCookie('assurance_pno', assurancePnoBase, 30);
		createCookie('charges_copro', chargesCoproBase, 30);
		createCookie('charges_copro_recuperable', chargesCoproRecuperableBase, 30);
		// Revenus et crédits en cours
		createCookie('salaire_mensuel', salaireMensuel, 30);
		createCookie('loyer_residence_principale', loyerResidencePrincipale, 30);
		createCookie('credit_actuel_mensualite', creditActuelMensualite, 30);
		createCookie('revenu_fonctier_actuel', revenuFonctierActuel, 30);

		// Réaffichage données
		// Bien
		divInfosParams.find('.montant_bien').text(formatCurrency(montantBien));
		divInfosParams.find('.loyer').text(formatCurrency(loyerBase));
		// Crédit
		divInfosParams.find('.montant_credit').text(formatCurrency(montantCredit));
		divInfosParams.find('.taux_credit').text(formatPercent(tauxCredit/100));
		divInfosParams.find('.duree_credit').text(dureeCredit*12);
		divInfosParams.find('.assurance_credit').text(formatCurrency(assuranceCredit));
		// Charges
		divInfosParams.find('.taxe_fonciere').text(formatCurrency(taxeFonciereBase));
		divInfosParams.find('.assurance_pno').text(formatCurrency(assurancePnoBase));
		divInfosParams.find('.charges_copro').text(formatCurrency(chargesCoproBase));
		divInfosParams.find('.charges_copro_recuperable').text(formatCurrency(chargesCoproRecuperableBase));
		// Revenus et crédits en cours
		divInfosParams.find('.salaire_mensuel').text(formatCurrency(salaireMensuel));
		divInfosParams.find('.loyer_residence_principale').text(formatCurrency(loyerResidencePrincipale));
		divInfosParams.find('.credit_actuel_mensualite').text(formatCurrency(creditActuelMensualite));
		divInfosParams.find('.revenu_fonctier_actuel').text(formatCurrency(revenuFonctierActuel));

		// Calcul frais acquisition
		let fraisNotaire = montantBien * FRAIS_NOTAIRE_PERCENT;
		let fraisDossier = FRAIS_DOSSIER_CREDIT;
		let fraisCautionnementFixe = FRAIS_FIXE_CAUTIONNEMENT;
		let commissionCaution = montantCredit * COMMISSION_CAUTION_PERCENT;
		let participationFmg = montantCredit * PARTICIPATION_FMG_PERCENT;
		let participationFmgReverse = participationFmg*PARTICIPATION_FMG_REVERSE_PERCENT; // partie reversé à la fin du remboursement
		let fraisCreditLogement = fraisCautionnementFixe + commissionCaution + participationFmg;

		let fraisAcquisition = fraisNotaire + fraisDossier + fraisCreditLogement;
		let fraisAcquisitionDeductibles = fraisCreditLogement - participationFmgReverse;

		// Calcul crédit
		let coutCredit = 0;
		let montantCreditRestant = montantCredit;
		let tauxCreditNominal = (tauxCredit/100);
		let creditMensualite = (montantCredit * (tauxCreditNominal/12)) / (1 - Math.pow((1+(tauxCreditNominal/12)), -(dureeCredit*12)));

		// Init charges
		let loyer = loyerBase;
		let taxeFonciere = taxeFonciereBase;
		let assurancePno = assurancePnoBase;
		let chargesCoproAnnee = chargesCoproBase;
		let chargesCoproRecuperableMensuelle = chargesCoproRecuperableBase;

		let loyerChargeCompriseAnnee2 = 0;
		let impotEtPrelevementSociauxAnnee2 = 0;
		let cashFlowAnnee2 = 0;

		let tableHtml = '';

		// console.log('crédit : ', montantCredit, tauxCredit, dureeCredit);
		// console.log(creditMensualite);
		// console.log(creditInterets);

		let tableYearList = $('table.year_list tbody');
		tableYearList.empty();
		// tableYearList.children().remove();

		for (let numAnnee=1; numAnnee<=dureeCredit+1; numAnnee++) {

			let divDetailYear = $('div.detail_year_base').clone().removeClass('detail_year_base').removeClass('hide');
			console.log('Calcul année '+numAnnee);

			// Revalorisation loyer et charges
			if (numAnnee > 1) {
				loyer = loyer + (loyer*TAUX_REVALORISATION_LOYER);
				taxeFonciere = taxeFonciere + (taxeFonciere*TAUX_REVALORISATION_TAXE_FONCIERE);
				assurancePno = assurancePno + (assurancePno*TAUX_REVALORISATION_ASSURANCE_PNO);
				chargesCoproAnnee = chargesCoproAnnee + (chargesCoproAnnee*TAUX_REVALORISATION_CHARGES_COPRO);
				chargesCoproRecuperableMensuelle = chargesCoproRecuperableMensuelle + (chargesCoproRecuperableMensuelle*TAUX_REVALORISATION_CHARGES_COPRO);
			}

			// Calcul des charges mensuelles de l'année
			let taxeOrdureMenagere = taxeFonciere * TAXE_ELEVEMENT_ORDURES_MENAGERES_PERCENT;
			let chargeCoproNonRecuperableAnnee = chargesCoproAnnee - (chargesCoproRecuperableMensuelle*12);
			let chargeRecuperableMensuelle = chargesCoproRecuperableMensuelle + (taxeOrdureMenagere / 12);

			let revenusFonciersAnnee = (loyer*12);
			let loyerChargeComprise = loyer + chargeRecuperableMensuelle;

			let fraisMensuelGestionLocative = 0;
			let fraisMensuelGli = 0;
			let fraisAnnuelMiseEnLocation = 0;
			if (fraisGestionLocativeEnabled) {
				fraisMensuelGestionLocative = loyerChargeComprise*GESTION_LOCATIVE_PERCENT;
			}
			if (fraisGliEnabled) {
				fraisMensuelGli = loyerChargeComprise*GARANTIE_LOYERS_IMPAYES_PERCENT;
			}
			if (fraisMiseEnLocationEnabled) {
				fraisAnnuelMiseEnLocation = (loyerChargeComprise*12)*MISE_EN_LOCATION_PERCENT;
			}

			let totalChargesAnnee = 0
				+ chargesCoproAnnee
				+ taxeFonciere
				+ assurancePno
				+ (assuranceCredit*12)
				+ (fraisMensuelGestionLocative*12)
				+ (fraisMensuelGli*12)
				+ fraisAnnuelMiseEnLocation
			;
			let totalChargesMois = totalChargesAnnee / 12;
			let totalChargesNonRecuperableAnnee = totalChargesAnnee - (chargeRecuperableMensuelle*12);

			// console.log(chargesCoproRecuperable, taxeOrdureMenagere);
			// console.log(taxeFonciere, chargeNonRecuperableMensuelle);

			// Calcul crédit pour chaque mois de l'année
			let listCreditInfosAnnee = [];
			let creditInteretsAnnee = 0;
			let creditCapitalAnnee = 0;
			for (let mois=1; mois<=12; mois++) {
				let creditInteretsMois = 0;
				let creditCapitalMois = 0;
				if (montantCreditRestant > 0) {
					creditInteretsMois = (tauxCreditNominal/12) * montantCreditRestant;
					creditCapitalMois = creditMensualite - creditInteretsMois;

					coutCredit += creditInteretsMois;
					creditInteretsAnnee += creditInteretsMois;
					creditCapitalAnnee += creditCapitalMois;
					montantCreditRestant -= creditCapitalMois;
				}

				listCreditInfosAnnee[mois] = {
					interets: creditInteretsMois,
					capital: creditCapitalMois,
				};
			}

			// Calcul charges déductibles pour l'année
			let totalChargesDeductiblesAnnee = totalChargesNonRecuperableAnnee + creditInteretsAnnee;
			if (numAnnee == 1) {
				totalChargesDeductiblesAnnee += fraisAcquisitionDeductibles;
			}

			// Calcul des impots et prélèvements sociaux de l'année
			let beneficeFoncier = revenusFonciersAnnee-totalChargesDeductiblesAnnee;
			let prelevementSociauxAnnee = beneficeFoncier * PRELEVEMENT_SOCIAUX_PERCENT;
			let beneficeFoncierAvecCsgDeducible = beneficeFoncier - (beneficeFoncier * CSG_DEDUCTIBLE_PERCENT);
			let impotRevenuAnnee = beneficeFoncierAvecCsgDeducible * trancheMarginaleImposition;

			let impotRevenuMensuel = impotRevenuAnnee / 12;
			let prelevementSociauxMensuel = prelevementSociauxAnnee / 12;

			let cashFlowAnnee = 0;
			let monthListTableHtml = '';
			for (let mois=1; mois<=12; mois++) {
				let creditInteretsMois = listCreditInfosAnnee[mois].interets;
				let creditCapitalMois = listCreditInfosAnnee[mois].capital;

				let cashFlow = loyerChargeComprise - totalChargesMois - creditInteretsMois - creditCapitalMois - impotRevenuMensuel - prelevementSociauxMensuel;
				cashFlowAnnee += cashFlow;

				monthListTableHtml +=
					'<tr>'
					+'<td class="text-right capitalize">'+getMonthNameByMonth(mois)+'</td>'
					+'<td class="number_value">'+formatCurrency(loyerChargeComprise)+'</td>'
					+'<td class="number_value">'+formatCurrency(creditCapitalMois)+'</td>'
					+'<td class="number_value">'+formatCurrency(creditInteretsMois)+'</td>'
					+'<td class="number_value">'+formatCurrency(totalChargesMois)+'</td>'
					+'<td class="number_value">'+formatCurrency(impotRevenuMensuel+prelevementSociauxMensuel)+'</td>'
					+'<td class="number_value bold text-'+(cashFlow>0?'success':'danger')+'">'+formatCurrency(cashFlow)+'</td>'
					+'</tr>'
				;
			}

			divDetailYear.find('table.month_list tbody').html(monthListTableHtml);

			let creditCapitalMoyenneMensuelle = creditCapitalAnnee/12;
			let creditInteretsMoyenneMensuelle = creditInteretsAnnee/12;
			let totalChargesDeductiblesMoyenneMensuelle = totalChargesDeductiblesAnnee/12;
			let cashFlowMoyenneMensuelle = cashFlowAnnee/12;

			if (numAnnee == 2) {
				cashFlowAnnee2 = cashFlowMoyenneMensuelle;
				impotEtPrelevementSociauxAnnee2 = impotRevenuMensuel + prelevementSociauxMensuel;
				loyerChargeCompriseAnnee2 = loyerChargeComprise;
			}

			divDetailYear.find('.year').text(numAnnee);

			// Tableau récap de l'année
			divDetailYear.find('.revenus_fonciers_annee').text(formatCurrency(revenusFonciersAnnee));
			divDetailYear.find('.credit_capital_annee').text(formatCurrency(creditCapitalAnnee)).parent().addClass(numAnnee>dureeCredit?'hide':'');
			divDetailYear.find('.total_charges_deductibles_annee').text(formatCurrency(totalChargesDeductiblesAnnee));
			divDetailYear.find('.impot_revenu_annee').text(formatCurrency(impotRevenuAnnee));
			divDetailYear.find('.prelevement_sociaux_annee').text(formatCurrency(prelevementSociauxAnnee));
			divDetailYear.find('.benefice_foncier_annee').text((beneficeFoncier>0?'+':'-')+' '+formatCurrency(Math.abs(beneficeFoncier)));
			divDetailYear.find('.cash_flow_annee').text((cashFlowAnnee>0?'+':'-')+' '+formatCurrency(Math.abs(cashFlowAnnee))).addClass('text-'+(cashFlowAnnee>0?'success':'danger'));

			// Tableau récap mensuel
			divDetailYear.find('.loyer').text(formatCurrency(loyerChargeComprise));
			divDetailYear.find('.loyer_hors_charges').text(formatCurrency(loyer));
			divDetailYear.find('.charges_recuperable').text(formatCurrency(chargeRecuperableMensuelle));
			divDetailYear.find('.credit_mensualite').text(formatCurrency(creditMensualite)).parent().addClass(numAnnee>dureeCredit?'hide':'');
			divDetailYear.find('.total_charges_par_mois').text(formatCurrency(totalChargesMois));
			divDetailYear.find('.impot_revenu_par_mois').text(formatCurrency(impotRevenuMensuel));
			divDetailYear.find('.prelevement_sociaux_par_mois').text(formatCurrency(prelevementSociauxMensuel));
			divDetailYear.find('.cash_flow_par_mois').text((cashFlowMoyenneMensuelle>0?'+':'-')+' '+formatCurrency(Math.abs(cashFlowMoyenneMensuelle))).addClass('text-'+(cashFlowMoyenneMensuelle>0?'success':'danger'));

			// Tableau charge déductibles
			divDetailYear.find('.taxe_fonciere').text(formatCurrency(taxeFonciere - taxeOrdureMenagere));
			divDetailYear.find('.assurance_pno').text(formatCurrency(assurancePno));
			divDetailYear.find('.charges_copro').text(formatCurrency(chargeCoproNonRecuperableAnnee));
			divDetailYear.find('.credit_interets').text(formatCurrency(creditInteretsAnnee)).parent().addClass(numAnnee>dureeCredit?'hide':'');
			divDetailYear.find('.assurance_credit').text(formatCurrency(assuranceCredit*12));
			if (fraisGestionLocativeEnabled) {
				divDetailYear.find('.frais_gestion_locative').text(formatCurrency(fraisMensuelGestionLocative*12)).parent().removeClass('hide');
			}
			if (fraisGliEnabled) {
				divDetailYear.find('.frais_gli').text(formatCurrency(fraisMensuelGli*12)).parent().removeClass('hide');
			}
			if (fraisMiseEnLocationEnabled) {
				divDetailYear.find('.frais_mise_en_location').text(formatCurrency(fraisAnnuelMiseEnLocation)).parent().removeClass('hide');
			}
			if (numAnnee == 1) {
				divDetailYear.find('.frais_acquisition_deductibles').text(formatCurrency(fraisAcquisitionDeductibles)).parent().removeClass('hide');
			}
			// divDetailYear.find('.total_charges_deductibles_annee').text(formatCurrency(totalChargesDeductiblesMoyenneMensuelle));

			tableHtml +=
				'<tr>'
				+'<td class="text-right">'+numAnnee+'</td>'
				+'<td class="number_value">'+formatCurrency(loyerChargeComprise)+'</td>'
				+'<td class="number_value">'+formatCurrency(creditCapitalMoyenneMensuelle)+'</td>'
				+'<td class="number_value">'+formatCurrency(creditInteretsMoyenneMensuelle)+'</td>'
				+'<td class="number_value">'+formatCurrency(totalChargesMois)+'</td>'
				+'<td class="number_value">'+formatCurrency(impotRevenuMensuel+prelevementSociauxMensuel)+'</td>'
				+'<td class="number_value bold text-'+(cashFlowMoyenneMensuelle>0?'success':'danger')+'">'+formatCurrency(cashFlowMoyenneMensuelle)+'</td>'
				+'<td class="text-right"><button class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></td>'
				+'</tr>'
				+'<tr class="details hide"><td colspan="8">'+divDetailYear.html()+'</td></tr>'
			;
			// tableYearList.find('tr:last td:first').append(divDetailYear);
		}

		$('table.year_list tbody').html(tableHtml);

		tableYearList.find('tr td button').off('click').click(function() {
			let detailTr = $(this).parent().parent().next();
			$(this).html('<span class="glyphicon glyphicon-'+(detailTr.hasClass('hide')?'minus':'plus')+'" aria-hidden="true"></span>');
			if (detailTr.hasClass('hide')) {
				detailTr.removeClass('hide');
			}
			else {
				detailTr.addClass('hide');
			}
			return false;
		});


		// Calcul apport personnel
		let apportPersonnel = (montantBien + fraisAcquisition) - montantCredit;

		// Calcul taux endettement
		let tauxEndettement = (loyerResidencePrincipale + creditActuelMensualite + creditMensualite) / (salaireMensuel + revenuFonctierActuel*0.7 + loyerBase*0.7);

		// Calcul rendement
		let rendementBrut = (loyerBase * 12) / (montantBien + fraisAcquisition);
		let rendementNet = ((loyerBase * 12) - impotEtPrelevementSociauxAnnee2*12 - taxeFonciereBase - assurancePnoBase - chargesCoproBase) / (montantBien + fraisAcquisition + coutCredit);

		// Rendement brut
		$('.rendement_brut').text(formatPercent(rendementBrut)).addClass('text-'+(rendementBrut<0.035?'danger':(rendementBrut<0.05?'warning':'success')));

		// Rendement net de charge
		// ((Loyer annuel – frais et charges)/(Prix + coût du crédit)) x 100
		$('.rendement_net').text(formatPercent(rendementNet)).addClass('text-'+(rendementNet<0.022?'danger':(rendementNet<0.045?'warning':'success')));

		// Rendement net d’imposition

		// Mensualité crédit
		$('.mensualite_credit').text(formatCurrency(creditMensualite)).addClass('text-info');
		// 957.01€ (180 mois)

		// Cash flow (année 2)
		$('.cash_flow_annee_2').text(formatCurrency(cashFlowAnnee2)).addClass('text-'+(cashFlowAnnee2<-150?'danger':(cashFlowAnnee2<0?'warning':'success')));

		// Frais d'aquisition
		$('.frais_acquisition').text(formatCurrency(fraisAcquisition));

		// Coût du prêt
		$('.cout_credit').text(formatCurrency(coutCredit));
		// 23 144€ (16%)

		// Apport personnel
		$('.apport_personnel').text(formatCurrency(apportPersonnel));

		// Taux endettement
		$('.taux_endettement').text(formatPercent(tauxEndettement)).addClass('text-'+(tauxEndettement<0.15?'success':(tauxEndettement<0.33?'warning':'danger')));

		initPopoverAndTooltip();

		console.log('fin calcul updateData');
	}

	function cacherForm() {
		form.parent().parent().addClass('hide');
		divInfosResult.removeClass('hide');

		// form.addClass('hide');
		// divInfosParams.removeClass('hide');
		// divInfosResult.removeClass('hide');
	}

	function montrerForm() {
		form.parent().parent().removeClass('hide');
		divInfosResult.addClass('hide');

		// form.removeClass('hide');
		// divInfosParams.addClass('hide');
		// divInfosResult.addClass('hide');
	}

	// form.find('input, select').change(updateData);
	for (let nbAnnees=5; nbAnnees<=25; nbAnnees++) {
		form.find('[name="duree_credit"]').append('<option value="'+nbAnnees+'">'+nbAnnees+'</option>');
	}

	function setDefaultParam(fieldName, globalVar) {
		let value = readCookie(fieldName);
		// console.log('value', value);
		if (typeof value != 'undefined' && value != null && value != 'NaN') {
			form.find('[name="'+fieldName+'"]').val(value);
			return;
		}
		// console.log('globalVar', globalVar);
		if (typeof globalVar != 'undefined' && globalVar != null) {
			form.find('[name="'+fieldName+'"]').val(globalVar);
			return;
		}
	}

	// Bien
	setDefaultParam('montant_bien', montantBien);
	setDefaultParam('loyer', loyer);

	// Crédit
	setDefaultParam('montant_credit', montantCredit);
	setDefaultParam('taux_credit', tauxCredit);
	setDefaultParam('duree_credit', dureeCredit);
	setDefaultParam('assurance_credit', assuranceCredit);

	// Charges
	setDefaultParam('taxe_fonciere', taxeFonciere);
	setDefaultParam('assurance_pno', assurancePno);
	setDefaultParam('charges_copro', chargesCoproAnnee);
	setDefaultParam('charges_copro_recuperable', chargesCoproRecuperableMensuelle);

	// Revenus et crédits en cours
	setDefaultParam('salaire_mensuel', salaireMensuel);
	setDefaultParam('loyer_residence_principale', loyerResidencePrincipale);
	setDefaultParam('credit_actuel_mensualite', creditActuelMensualite);
	setDefaultParam('revenu_fonctier_actuel', revenuFonctierActuel);

	form.find('button[name="validate"]').off('click').click(function (e) {
		e.preventDefault();
		cacherForm();
		updateData();
		return false;
	});

	divInfosParams.find('a.edit_params').off('click').click(function (e) {
		e.preventDefault();
		montrerForm();
		return false;
	});

	initPopoverAndTooltip();
});
