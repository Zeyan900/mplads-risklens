import { RecommendedWork, VendorPayment, AgencyProfile, AuditLogEntry } from "@/types/mplad";

export const INITIAL_WORKS: RecommendedWork[] = [
  {
    unique_work_number: "MPLAD-2026-DL-0142",
    data_as_on: "18-08-2026",
    state: "Delhi",
    implementing_district_per_source: "South Delhi",
    implementing_district_per_lgd: "South Delhi",
    implementing_district_lgd_code: 142,
    loksabha_constituency: "South Delhi",
    house_name: "18th Lok Sabha",
    loksabha_MP_name: "Ramvir Singh Bidhuri",
    work_category: "Drinking Water Facilities",
    work_name: "Construction of Deep Borewell & 60,000 Ltr Community Water Tank",
    implementing_agency_name: "Delhi Jal Board (Executive Division South)",
    work_description: "Construction of 60,000 litre capacity RCC overhead water tank, deep submersible borewell, solar pump integration and associated distribution pipeline for residential pocket Phase-III.",
    date_of_recommendation: "12-01-2025",
    date_of_sanction: "14-03-2025",
    expected_completion_date: "14-11-2025",
    image_status: "Available",
    recommended_amount: 1200000,
    sanctioned_amount: 1200000,
    expenditure_amount: 936000,
    physical_progress_percent: 30,
    units: "recommended_amount in indian rupees",
    status: "In Progress",
    review_status: "Pending Review",
    risk_score: 78,
    risk_priority: "High",
    last_progress_update_days_ago: 52,
    turnaround_days: 61,
    latitude: 28.5355,
    longitude: 77.2100,
    is_synthetic: true,
    risk_signals: [
      {
        id: "SIG-0142-1",
        channel: "payment_progress",
        title: "Severe Payment-Progress Mismatch",
        severity: "high",
        score_contribution: 35,
        why_flagged: "Cumulative disbursement stands at 78.0% (₹9.36 Lakh) against certified physical progress of only 30.0%, creating an acute 48.0 percentage point deficit.",
        evidence_summary: "PFMS Release #DL-9412 cleared 3rd installment release without accompanying physical measurement certification.",
        benchmark_rule: "MPLADS Guidelines (April 2023) §7.4: Subsequent installment releases require stage-wise physical progress certification matching or exceeding cumulative payments.",
        suggested_action: "Halt next disbursement tranche. Request physical measurement book (MB) and revised site milestone certification before passing next invoice."
      },
      {
        id: "SIG-0142-2",
        channel: "photo_evidence",
        title: "Stale Visual Inspection Evidence",
        severity: "medium",
        score_contribution: 25,
        why_flagged: "Last geotagged site photo update is 52 days old despite two successive vendor disbursements released in the interim.",
        evidence_summary: "Photo uploaded on 28-06-2026 shows only foundation column shuttering; no photo evidence of 60,000L tank staging.",
        benchmark_rule: "eSAKSHI Mandatory Milestone Photo upload mandate prior to Release 2 & 3.",
        suggested_action: "Dispatch field junior engineer for geo-referenced inspection with the mobile application."
      },
      {
        id: "SIG-0142-3",
        channel: "delay",
        title: "Execution Schedule Slippage",
        severity: "low",
        score_contribution: 18,
        why_flagged: "Elapsed time is 72% of planned work duration while physical progress sits at 30%.",
        evidence_summary: "Original planned completion date was 14-11-2025; currently 68 days overdue from schedule milestone.",
        benchmark_rule: "Schedule tracking and Liquidated Damages review under General Financial Rules (GFR 2017).",
        suggested_action: "Seek comprehensive schedule recovery plan from Delhi Jal Board."
      }
    ],
    payments: [
      {
        payment_id: "PAY-DL-8120",
        unique_work_number: "MPLAD-2026-DL-0142",
        vendor_name: "AquaTech Infra Pvt Ltd",
        implementing_agency_name: "Delhi Jal Board (Executive Division South)",
        expenditure_date: "15-04-2025",
        payment_status: "Payment Success",
        expenditure_amount: 360000,
        invoice_ref: "INV-AT-102",
        pfms_ref: "C0425981241"
      },
      {
        payment_id: "PAY-DL-8750",
        unique_work_number: "MPLAD-2026-DL-0142",
        vendor_name: "AquaTech Infra Pvt Ltd",
        implementing_agency_name: "Delhi Jal Board (Executive Division South)",
        expenditure_date: "18-07-2025",
        payment_status: "Payment Success",
        expenditure_amount: 300000,
        invoice_ref: "INV-AT-144",
        pfms_ref: "C0725119832"
      },
      {
        payment_id: "PAY-DL-9412",
        unique_work_number: "MPLAD-2026-DL-0142",
        vendor_name: "Apex Piping & Pumps",
        implementing_agency_name: "Delhi Jal Board (Executive Division South)",
        expenditure_date: "04-06-2026",
        payment_status: "Payment Success",
        expenditure_amount: 276000,
        invoice_ref: "INV-AP-088",
        pfms_ref: "C0626002914"
      }
    ],
    evidence_items: [
      {
        id: "EVD-0142-1",
        title: "Sanction Order & Administrative Approval",
        type: "sanction_order",
        date: "14-03-2025",
        ref_number: "SD-DA/MPLADS/2025/119",
        source: "eSAKSHI Portal",
        provenance: "Authorised Data",
        status: "Verified",
        description: "Official administrative approval and expenditure sanction for ₹12.00 Lakh issued by District Authority.",
        file_size: "1.4 MB",
        verified: true
      },
      {
        id: "EVD-0142-2",
        title: "PFMS Disbursement Schedule #DL-9412",
        type: "payment_voucher",
        date: "04-06-2026",
        ref_number: "PFMS-VCH-88219",
        source: "PFMS Gateway",
        provenance: "Authorised Data",
        status: "Cleared",
        description: "Cumulative release voucher confirming ₹9,36,000 debited from SNA bank account.",
        file_size: "480 KB",
        verified: true
      },
      {
        id: "EVD-0142-3",
        title: "Last Physical Measurement Certificate",
        type: "measurement_book",
        date: "28-06-2026",
        ref_number: "MB-2026-PG-44",
        source: "District Work Register",
        provenance: "Synthetic Demo",
        status: "Needs Evidence",
        description: "Sub-divisional engineer recorded 30% completion of foundation columns. No subsequent entry recorded in 52 days.",
        file_size: "2.1 MB",
        verified: false
      },
      {
        id: "EVD-0142-4",
        title: "Foundation Site Photo (Geo-tagged)",
        type: "site_photo",
        date: "28-06-2026",
        ref_number: "IMG-GEO-280626",
        source: "Site Geo-Inspection",
        provenance: "Synthetic Demo",
        status: "Stale",
        description: "Single wide-angle photograph of foundation trench and steel reinforcement.",
        file_size: "3.8 MB",
        verified: true
      }
    ]
  },
  {
    unique_work_number: "WS/MP18275/2025-2026/183102",
    data_as_on: "18-08-2026",
    state: "Andaman and Nicobar Islands",
    implementing_district_per_source: "South Andamans",
    implementing_district_per_lgd: "South Andamans",
    implementing_district_lgd_code: 602,
    loksabha_constituency: "Andaman And Nicobar Islands",
    house_name: "18th Lok Sabha",
    loksabha_MP_name: "Bishnu Pada Ray",
    work_category: "Trust and Society",
    work_name: "Construction of Community Centers and Community Halls at Sri Guruji Centre",
    implementing_agency_name: "Implementing District Authority(SA)",
    work_description: "Con. Bore well with water tank (60000 Ltr capacity), boundary wall with gate, parking space, toilets with bathroom, drainage system, rain harvesting system at Sri Guruji Community Centre, Dollygunj",
    date_of_recommendation: "18-03-2025",
    date_of_sanction: "24-05-2025",
    expected_completion_date: "24-02-2026",
    image_status: "Not Available",
    recommended_amount: 8450000,
    sanctioned_amount: 8450000,
    expenditure_amount: 4992971,
    physical_progress_percent: 45,
    units: "recommended_amount in indian rupees",
    status: "In Progress",
    review_status: "Pending Review",
    risk_score: 82,
    risk_priority: "High",
    last_progress_update_days_ago: 41,
    turnaround_days: 67,
    latitude: 11.6670,
    longitude: 92.7300,
    is_synthetic: false,
    risk_signals: [
      {
        id: "SIG-183102-1",
        channel: "compliance",
        title: "Trust / Society Cap Limit Breach",
        severity: "high",
        score_contribution: 40,
        why_flagged: "Recommended and Sanctioned amount of ₹84.50 Lakh exceeds the codified statutory ceiling of ₹75.00 Lakh for works allocated to registered Trusts and Societies.",
        evidence_summary: "Official PRD Table §9 / MPLADS Guidelines April 2023 §3.12 ceiling is capped strictly at ₹75 Lakh per project lifetime.",
        benchmark_rule: "MPLADS Guidelines 2023 §3.12: The maximum financial assistance for works executed through or for Trusts/Societies shall not exceed ₹75 Lakh.",
        suggested_action: "Review administrative approval order. Verify whether non-Trust co-funding was commingled or seek SNA clarification regarding exemption."
      },
      {
        id: "SIG-183102-2",
        channel: "photo_evidence",
        title: "Payment Released With Zero Visual Proof",
        severity: "high",
        score_contribution: 30,
        why_flagged: "Cumulative payment of ₹49,92,971 (59.1%) released despite image_status recording 'Not Available' in the official eSAKSHI data export.",
        evidence_summary: "Field image_status = 'Not Available' on live MoSPI 18th LS recommended works record row 183102.",
        benchmark_rule: "eSAKSHI Operational Circular 2024: Digital milestone geotagged photographic upload is mandatory prior to releasing payments exceeding ₹25 Lakh.",
        suggested_action: "Suspend remaining release of ₹34.57 Lakh until geo-tagged site images are authenticated on eSAKSHI portal."
      },
      {
        id: "SIG-183102-3",
        channel: "cost_outlier",
        title: "Multi-Component Packaging Outlier",
        severity: "medium",
        score_contribution: 12,
        why_flagged: "Work packages 6 distinct items (Borewell, Tank, Boundary Wall, Parking, Toilets, Rainwater) under a single lump-sum community hall sanction.",
        evidence_summary: "Combined scope exceeds peer median for Island District Community Hall sanctions by 2.1x.",
        benchmark_rule: "Schedule of Rates (CPWD/APWD): Works with disparate sub-assets require itemized sub-estimates and distinct measurement registers.",
        suggested_action: "Request APWD itemized Bill of Quantities (BoQ) breakdown."
      }
    ],
    payments: [
      {
        payment_id: "PAY-SA-0012",
        unique_work_number: "WS/MP18275/2025-2026/183102",
        vendor_name: "Haneefa Construction",
        implementing_agency_name: "Implementing District Authority(SA)",
        expenditure_date: "22-07-2025",
        payment_status: "Payment Success",
        expenditure_amount: 2500000,
        invoice_ref: "INV-HC-2025-18",
        pfms_ref: "C0725881023"
      },
      {
        payment_id: "PAY-SA-0089",
        unique_work_number: "WS/MP18275/2025-2026/183102",
        vendor_name: "Haneefa Construction",
        implementing_agency_name: "Implementing District Authority(SA)",
        expenditure_date: "14-01-2026",
        payment_status: "Payment Success",
        expenditure_amount: 2492971,
        invoice_ref: "INV-HC-2026-04",
        pfms_ref: "C0126449102"
      }
    ],
    evidence_items: [
      {
        id: "EVD-183102-1",
        title: "MoSPI 18th Lok Sabha Work Record Row #183102",
        type: "sanction_order",
        date: "18-08-2026",
        ref_number: "WS/MP18275/2025-2026/183102",
        source: "eSAKSHI Portal",
        provenance: "Public Source",
        status: "Verified",
        description: "Official published open data record from Dataful/MoSPI open catalog for South Andamans.",
        file_size: "620 KB",
        verified: true
      },
      {
        id: "EVD-183102-2",
        title: "Trust Eligibility Verification Certificate",
        type: "guideline_rule",
        date: "12-04-2025",
        ref_number: "REG-SOC-AN-441",
        source: "MPLADS Guidelines 2023",
        provenance: "Public Source",
        status: "Review Required",
        description: "Registration certificate for Sri Guruji Community Centre society. Limit restriction §3.12 applies.",
        file_size: "1.1 MB",
        verified: true
      }
    ]
  },
  {
    unique_work_number: "MPLAD-2026-MP-0401",
    data_as_on: "18-08-2026",
    state: "Madhya Pradesh",
    implementing_district_per_source: "Indore",
    implementing_district_per_lgd: "Indore",
    implementing_district_lgd_code: 402,
    loksabha_constituency: "Indore",
    house_name: "18th Lok Sabha",
    loksabha_MP_name: "Shankar Lalwani",
    work_category: "Roads, Pathways and Bridges",
    work_name: "Construction of CC Road and Paver Blocks in Sector 4B, Ward 18",
    implementing_agency_name: "Indore Municipal Corporation (Zone 7)",
    work_description: "Construction of 450 meter cement concrete road and interlocking paver block pathway from Community Bhavan to Main Market Road in Sector 4B, Ward 18.",
    date_of_recommendation: "02-02-2025",
    date_of_sanction: "20-03-2025",
    expected_completion_date: "20-09-2025",
    image_status: "Available",
    recommended_amount: 2450000,
    sanctioned_amount: 2450000,
    expenditure_amount: 1960000,
    physical_progress_percent: 85,
    units: "recommended_amount in indian rupees",
    status: "In Progress",
    review_status: "Pending Review",
    risk_score: 80,
    risk_priority: "High",
    latitude: 22.7196,
    longitude: 75.8577,
    is_synthetic: true,
    duplicate_work_candidate_id: "MPLAD-2026-MP-0402",
    duplicate_distance_meters: 42,
    duplicate_similarity: 0.91,
    last_progress_update_days_ago: 14,
    turnaround_days: 46,
    risk_signals: [
      {
        id: "SIG-0401-1",
        channel: "duplicate_split",
        title: "Potential Near-Duplicate or Split Work Signal",
        severity: "high",
        score_contribution: 45,
        why_flagged: "Identified adjacent sister work MPLAD-2026-MP-0402 located just 42 meters away with 91% description lexical similarity, sanctioned only 18 days later by the same agency.",
        evidence_summary: "Work MPLAD-2026-MP-0401 (₹24.50L) and MPLAD-2026-MP-0402 (₹24.80L) both sit just beneath the ₹25 Lakh mandatory e-tendering and state review threshold.",
        benchmark_rule: "GFR 2017 Rule 157 & MPLADS Guidelines §4.8: Splitting of works to avoid higher tendering procedures or administrative thresholds is strictly prohibited.",
        suggested_action: "Perform joint physical alignment survey on GIS to ascertain whether both sanctions cover the same road stretch."
      },
      {
        id: "SIG-0401-2",
        channel: "vendor_network",
        title: "Same Vendor Shared Across Clustered Works",
        severity: "medium",
        score_contribution: 25,
        why_flagged: "Vendor 'Malwa Infra Buildcon' was awarded both contiguous road works without separate public competitive notifications.",
        evidence_summary: "Payment vouchers show identical contractor receiving both disbursements.",
        benchmark_rule: "CVC Guidelines on Procurement Transparency and Competitive Bidding.",
        suggested_action: "Review tender log and notice inviting tender (NIT) for both contiguous works."
      }
    ],
    payments: [
      {
        payment_id: "PAY-IND-4011",
        unique_work_number: "MPLAD-2026-MP-0401",
        vendor_name: "Malwa Infra Buildcon",
        implementing_agency_name: "Indore Municipal Corporation (Zone 7)",
        expenditure_date: "14-06-2025",
        payment_status: "Payment Success",
        expenditure_amount: 1960000,
        invoice_ref: "INV-MIB-882",
        pfms_ref: "C0625102911"
      }
    ],
    evidence_items: [
      {
        id: "EVD-0401-1",
        title: "Sanction Letter Sector 4B Ward 18",
        type: "sanction_order",
        date: "20-03-2025",
        ref_number: "IMC-ZN7/2025/401",
        source: "District Work Register",
        provenance: "Synthetic Demo",
        status: "Verified",
        description: "Administrative sanction for ₹24.50 Lakh for road work.",
        file_size: "950 KB",
        verified: true
      }
    ]
  },
  {
    unique_work_number: "MPLAD-2026-MP-0402",
    data_as_on: "18-08-2026",
    state: "Madhya Pradesh",
    implementing_district_per_source: "Indore",
    implementing_district_per_lgd: "Indore",
    implementing_district_lgd_code: 402,
    loksabha_constituency: "Indore",
    house_name: "18th Lok Sabha",
    loksabha_MP_name: "Shankar Lalwani",
    work_category: "Roads, Pathways and Bridges",
    work_name: "Construction of CC Road and Interlocking Paver Blocks in Sector 4B Link Road, Ward 18",
    implementing_agency_name: "Indore Municipal Corporation (Zone 7)",
    work_description: "Construction of 420 meter cement concrete road and interlocking tiles pathway from Market Road to Sub-Station in Sector 4B, Ward 18.",
    date_of_recommendation: "18-02-2025",
    date_of_sanction: "07-04-2025",
    expected_completion_date: "07-10-2025",
    image_status: "Available",
    recommended_amount: 2480000,
    sanctioned_amount: 2480000,
    expenditure_amount: 1984000,
    physical_progress_percent: 80,
    units: "recommended_amount in indian rupees",
    status: "In Progress",
    review_status: "Pending Review",
    risk_score: 79,
    risk_priority: "High",
    latitude: 22.7199,
    longitude: 75.8580,
    is_synthetic: true,
    duplicate_work_candidate_id: "MPLAD-2026-MP-0401",
    duplicate_distance_meters: 42,
    duplicate_similarity: 0.91,
    last_progress_update_days_ago: 18,
    turnaround_days: 48,
    risk_signals: [
      {
        id: "SIG-0402-1",
        channel: "duplicate_split",
        title: "Potential Near-Duplicate or Split Work Signal",
        severity: "high",
        score_contribution: 45,
        why_flagged: "Sister work to MPLAD-2026-MP-0401 (42m apart, 91% description cosine similarity, sanctioned 18 days apart).",
        evidence_summary: "Combined cost of ₹49.30 Lakh splits across two ₹24.xx Lakh orders.",
        benchmark_rule: "MPLADS Guidelines §4.8: Work fragmentation restriction.",
        suggested_action: "Conduct on-site inspection and overlay GIS survey tracks."
      }
    ],
    payments: [
      {
        payment_id: "PAY-IND-4022",
        unique_work_number: "MPLAD-2026-MP-0402",
        vendor_name: "Malwa Infra Buildcon",
        implementing_agency_name: "Indore Municipal Corporation (Zone 7)",
        expenditure_date: "25-06-2025",
        payment_status: "Payment Success",
        expenditure_amount: 1984000,
        invoice_ref: "INV-MIB-894",
        pfms_ref: "C0625199201"
      }
    ],
    evidence_items: []
  },
  {
    unique_work_number: "WS/MP18275/2024-2025/110940",
    data_as_on: "18-08-2026",
    state: "Andaman and Nicobar Islands",
    implementing_district_per_source: "South Andamans",
    implementing_district_per_lgd: "South Andamans",
    implementing_district_lgd_code: 602,
    loksabha_constituency: "Andaman And Nicobar Islands",
    house_name: "18th Lok Sabha",
    loksabha_MP_name: "Bishnu Pada Ray",
    work_category: "Other Public Facilities",
    work_name: "Installation of Street Security Gates in Streets/Public Places for Safety",
    implementing_agency_name: "EE (SAD, APWD)",
    work_description: "Fabrication and erection of heavy iron security gates with lockable latches across key street intersections.",
    date_of_recommendation: "10-10-2024",
    date_of_sanction: "12-12-2024",
    expected_completion_date: "12-06-2025",
    image_status: "Available",
    recommended_amount: 1200000,
    sanctioned_amount: 1189292,
    expenditure_amount: 1189292,
    physical_progress_percent: 100,
    units: "expenditure_amount in indian rupees",
    status: "Completed",
    review_status: "Pending Review",
    risk_score: 68,
    risk_priority: "Medium",
    latitude: 11.6420,
    longitude: 92.7150,
    is_synthetic: false,
    risk_signals: [
      {
        id: "SIG-110940-1",
        channel: "vendor_network",
        title: "Anomalous Vendor Share Within Agency (Haneefa Construction)",
        severity: "medium",
        score_contribution: 35,
        why_flagged: "Vendor 'Haneefa Construction' secured 84% of total minor structural sanctions awarded by EE (SAD, APWD) across consecutive tenders.",
        evidence_summary: "Direct row from PRD §8.2: Haneefa Construction paid ₹1,189,292 under this work, and ₹803,540 under another work in same quarter.",
        benchmark_rule: "CVC Guidelines on Procurement: High vendor concentration (>70% single-vendor award in an agency) triggers audit flag.",
        suggested_action: "Review tender log and quotation records to confirm broad tender publication."
      }
    ],
    payments: [
      {
        payment_id: "PAY-AND-1109",
        unique_work_number: "WS/MP18275/2024-2025/110940",
        vendor_name: "Haneefa Construction",
        implementing_agency_name: "EE (SAD, APWD)",
        expenditure_date: "09-04-2026",
        payment_status: "Payment Success",
        expenditure_amount: 1189292,
        invoice_ref: "INV-HC-2026-91",
        pfms_ref: "C0426189912"
      }
    ],
    evidence_items: []
  },
  {
    unique_work_number: "MPLAD-2026-DL-0319",
    data_as_on: "18-08-2026",
    state: "Delhi",
    implementing_district_per_source: "South West Delhi",
    implementing_district_per_lgd: "South West Delhi",
    implementing_district_lgd_code: 143,
    loksabha_constituency: "South Delhi",
    house_name: "18th Lok Sabha",
    loksabha_MP_name: "Ramvir Singh Bidhuri",
    work_category: "Education and Schools",
    work_name: "Procurement of Advanced Composite Science Lab Equipment & Smart Displays",
    implementing_agency_name: "Directorate of Education (District SW)",
    work_description: "Supply, testing and commissioning of physics, chemistry and biology laboratory apparatus and 3 interactive digital screens for Government Senior Secondary School.",
    date_of_recommendation: "05-04-2025",
    date_of_sanction: "12-05-2025",
    expected_completion_date: "12-11-2025",
    image_status: "Not Available",
    recommended_amount: 2840000,
    sanctioned_amount: 2840000,
    expenditure_amount: 2840000,
    physical_progress_percent: 100,
    units: "recommended_amount in indian rupees",
    status: "Completed",
    review_status: "Pending Review",
    risk_score: 74,
    risk_priority: "High",
    latitude: 28.5921,
    longitude: 77.0460,
    is_synthetic: true,
    risk_signals: [
      {
        id: "SIG-0319-1",
        channel: "photo_evidence",
        title: "100% Payment Cleared With Zero Asset Image Upload",
        severity: "high",
        score_contribution: 38,
        why_flagged: "Final completion certificate recorded and 100% funds (₹28.40 Lakh) disbursed to vendor, but image_status remains 'Not Available' in central database.",
        evidence_summary: "Both final invoice and completion certificate marked closed without single visual inspection photo in eSAKSHI.",
        benchmark_rule: "MPLADS Guidelines §8.2: No completion certificate can be closed without upload of geo-tagged photographs of the created asset.",
        suggested_action: "Direct the headmaster and junior engineer to upload physical installation photos of all laboratory apparatus."
      }
    ],
    payments: [
      {
        payment_id: "PAY-DL-3191",
        unique_work_number: "MPLAD-2026-DL-0319",
        vendor_name: "EduScientific Instruments Corp",
        implementing_agency_name: "Directorate of Education (District SW)",
        expenditure_date: "20-10-2025",
        payment_status: "Payment Success",
        expenditure_amount: 2840000,
        invoice_ref: "INV-ES-9102",
        pfms_ref: "C1025771021"
      }
    ],
    evidence_items: []
  },
  {
    unique_work_number: "MPLAD-2026-MP-0205",
    data_as_on: "18-08-2026",
    state: "Madhya Pradesh",
    implementing_district_per_source: "Indore",
    implementing_district_per_lgd: "Indore",
    implementing_district_lgd_code: 402,
    loksabha_constituency: "Indore",
    house_name: "18th Lok Sabha",
    loksabha_MP_name: "Shankar Lalwani",
    work_category: "Sanitation and Drainage",
    work_name: "Construction of RCC Covered Stormwater Drainage in Gram Bicholi Mardana",
    implementing_agency_name: "Rural Engineering Services (RES Division 1)",
    work_description: "Construction of 600 meter RCC box drain with slab covers along the main village approach road.",
    date_of_recommendation: "15-03-2025",
    date_of_sanction: "28-04-2025",
    expected_completion_date: "28-10-2025",
    image_status: "Available",
    recommended_amount: 2910000,
    sanctioned_amount: 2910000,
    expenditure_amount: 1455000,
    physical_progress_percent: 50,
    units: "recommended_amount in indian rupees",
    status: "In Progress",
    review_status: "Pending Review",
    risk_score: 76,
    risk_priority: "High",
    latitude: 22.7050,
    longitude: 75.9120,
    is_synthetic: true,
    risk_signals: [
      {
        id: "SIG-0205-1",
        channel: "cost_outlier",
        title: "Unit Cost Significantly Exceeds District Median (3.4x)",
        severity: "high",
        score_contribution: 38,
        why_flagged: "Estimated cost of ₹4,850 per linear meter is 3.42 times the median peer cost of ₹1,418/m for RCC village drains in Indore district.",
        evidence_summary: "Peer group analysis across 34 rural drain works in Indore (Q1: ₹1,200/m, Median: ₹1,418/m, Q3: ₹1,750/m). Z-score: +3.82.",
        benchmark_rule: "State PWD Schedule of Rates (SoR) Chapter 14 - Drainage Works.",
        suggested_action: "Require Technical Sanction authority to furnish justification for high unit cost or soil complication factors."
      }
    ],
    payments: [
      {
        payment_id: "PAY-IND-2051",
        unique_work_number: "MPLAD-2026-MP-0205",
        vendor_name: "Shree Ram Construction Co",
        implementing_agency_name: "Rural Engineering Services (RES Division 1)",
        expenditure_date: "10-07-2025",
        payment_status: "Payment Success",
        expenditure_amount: 1455000,
        invoice_ref: "INV-SRC-441",
        pfms_ref: "C0725881022"
      }
    ],
    evidence_items: []
  },
  {
    unique_work_number: "MPLAD-2026-MP-0112",
    data_as_on: "18-08-2026",
    state: "Madhya Pradesh",
    implementing_district_per_source: "Indore",
    implementing_district_per_lgd: "Indore",
    implementing_district_lgd_code: 402,
    loksabha_constituency: "Indore",
    house_name: "18th Lok Sabha",
    loksabha_MP_name: "Shankar Lalwani",
    work_category: "Electricity and Non-Conventional Energy",
    work_name: "Installation of 50 Standalone Solar LED High-Mast Lighting Systems",
    implementing_agency_name: "Madhya Pradesh Urja Vikas Nigam (MPUVNL)",
    work_description: "Supply and erection of 50 units of 40W solar LED street lights with battery units across rural market intersections.",
    date_of_recommendation: "22-10-2024",
    date_of_sanction: undefined,
    expected_completion_date: undefined,
    image_status: "Not Available",
    recommended_amount: 1750000,
    sanctioned_amount: 0,
    expenditure_amount: 0,
    physical_progress_percent: 0,
    units: "recommended_amount in indian rupees",
    status: "Recommended",
    review_status: "Pending Review",
    risk_score: 58,
    risk_priority: "Medium",
    latitude: 22.7280,
    longitude: 75.8650,
    is_synthetic: true,
    turnaround_days: 114,
    risk_signals: [
      {
        id: "SIG-0112-1",
        channel: "delay",
        title: "Sanction Turnaround Breach (114 Days vs 75-Day Limit)",
        severity: "medium",
        score_contribution: 32,
        why_flagged: "Recommended by MP 114 days ago without issuance of administrative sanction or technical rejection, exceeding statutory 75-day turnaround.",
        evidence_summary: "Date of recommendation: 22-10-2024; pending sanction at District Authority level for 114 days.",
        benchmark_rule: "MPLADS Guidelines (April 2023) §3.4: District Authority must accord sanction within 75 days of MP recommendation.",
        suggested_action: "Issue prompt notice to District Authority for fast-track clearance or formal written return with reasons to MP office."
      }
    ],
    payments: [],
    evidence_items: []
  }
];

// Generate 92 realistic baseline works to complete 100+ works
const CATEGORIES = [
  "Drinking Water Facilities",
  "Roads, Pathways and Bridges",
  "Sanitation and Drainage",
  "Education and Schools",
  "Health and Family Welfare",
  "Community Infrastructure",
  "Electricity and Non-Conventional Energy",
  "Irrigation Facilities",
  "Sports and Youth Development"
];

const DISTRICTS = [
  { state: "Madhya Pradesh", dist: "Indore", lgd: 402, const: "Indore", mp: "Shankar Lalwani", lat: 22.7196, lng: 75.8577 },
  { state: "Andaman and Nicobar Islands", dist: "South Andamans", lgd: 602, const: "Andaman And Nicobar Islands", mp: "Bishnu Pada Ray", lat: 11.6234, lng: 92.7265 },
  { state: "Delhi", dist: "South Delhi", lgd: 142, const: "South Delhi", mp: "Ramvir Singh Bidhuri", lat: 28.5355, lng: 77.2100 },
  { state: "Maharashtra", dist: "Pune", lgd: 521, const: "Pune", mp: "Murlidhar Mohol", lat: 18.5204, lng: 73.8567 },
  { state: "Uttar Pradesh", dist: "Varanasi", lgd: 198, const: "Varanasi", mp: "Narendra Modi", lat: 25.3176, lng: 82.9739 },
  { state: "Tamil Nadu", dist: "Chennai", lgd: 603, const: "Chennai South", mp: "Dr. Thamizhachi Thangapandian", lat: 13.0827, lng: 80.2707 },
  { state: "Karnataka", dist: "Bengaluru Urban", lgd: 554, const: "Bangalore South", mp: "Tejasvi Surya", lat: 12.9716, lng: 77.5946 },
  { state: "Rajasthan", dist: "Jaipur", lgd: 104, const: "Jaipur", mp: "Manju Sharma", lat: 26.9124, lng: 75.7873 }
];

const AGENCIES = [
  "Public Works Department (Div 1)",
  "Rural Engineering Services (RES)",
  "Municipal Corporation Infrastructure Wing",
  "Panchayat Raj Engineering Division",
  "Public Health Engineering Department (PHED)",
  "Zilla Parishad Construction Cell"
];

const VENDORS = [
  "National Infrastructure Solutions",
  "Kalyan Construction Co.",
  "Bharat Vikas Infra Tech",
  "Apex Engineers & Builders",
  "Metro Civil Works Ltd",
  "Shree Sai Electricals & Solar",
  "Pinnacle Tech Supplies",
  "Sai Krupa Road Developers",
  "Om Sai Drinking Water Projects"
];

function generateAdditionalWorks(): RecommendedWork[] {
  const additional: RecommendedWork[] = [];
  
  for (let i = 1; i <= 93; i++) {
    const d = DISTRICTS[i % DISTRICTS.length];
    const cat = CATEGORIES[i % CATEGORIES.length];
    const agency = AGENCIES[i % AGENCIES.length];
    const vendor = VENDORS[i % VENDORS.length];
    
    // Most normal works are 10 - 35 score, well within limits
    const isMildAnomaly = i % 15 === 0;
    const riskScore = isMildAnomaly ? 45 + (i % 15) : 8 + (i % 26);
    const riskPriority = riskScore >= 70 ? "High" : riskScore >= 40 ? "Medium" : "Low";
    
    const amount = 800000 + ((i * 137000) % 3500000);
    const progress = Math.min(100, Math.max(10, (i * 11) % 100));
    const paidPct = progress > 50 ? progress - 5 : progress;
    const paidAmount = Math.round((amount * paidPct) / 100);
    
    const id = `MPLAD-2026-WK-${1000 + i}`;
    
    // Slight coordinates jitter around district centre
    const lat = d.lat + ((i % 10) - 5) * 0.015;
    const lng = d.lng + (((i * 3) % 10) - 5) * 0.015;

    const work: RecommendedWork = {
      unique_work_number: id,
      data_as_on: "18-08-2026",
      state: d.state,
      implementing_district_per_source: d.dist,
      implementing_district_per_lgd: d.dist,
      implementing_district_lgd_code: d.lgd,
      loksabha_constituency: d.const,
      house_name: "18th Lok Sabha",
      loksabha_MP_name: d.mp,
      work_category: cat,
      work_name: `${cat} Work in Ward ${(i % 30) + 1}, ${d.dist}`,
      implementing_agency_name: agency,
      work_description: `Public development work for ${cat.toLowerCase()} to upgrade civic facilities and infrastructure in village/ward ${(i % 30) + 1}.`,
      date_of_recommendation: `0${(i % 28) + 1}-0${(i % 9) + 1}-2025`,
      date_of_sanction: `1${(i % 15) + 1}-0${(i % 8) + 2}-2025`,
      expected_completion_date: `20-12-2025`,
      image_status: i % 7 === 0 ? "Not Available" : "Available",
      recommended_amount: amount,
      sanctioned_amount: amount,
      expenditure_amount: paidAmount,
      physical_progress_percent: progress,
      units: "recommended_amount in indian rupees",
      status: progress === 100 ? "Completed" : "In Progress",
      review_status: "Pending Review",
      risk_score: riskScore,
      risk_priority: riskPriority,
      last_progress_update_days_ago: (i % 40) + 2,
      turnaround_days: 35 + (i % 30),
      latitude: lat,
      longitude: lng,
      is_synthetic: true,
      risk_signals: isMildAnomaly ? [
        {
          id: `SIG-${id}-1`,
          channel: "delay",
          title: "Minor Milestone Schedule Deviation",
          severity: "low",
          score_contribution: 15,
          why_flagged: "Physical progress is 12% behind originally projected milestone timeline.",
          evidence_summary: "Contractor submitted revised monsoon work schedule.",
          benchmark_rule: "MPLADS Guideline Chapter 6 - Monitoring of Timelines.",
          suggested_action: "Monitor weekly progress updates during district monthly coordination meeting."
        }
      ] : [],
      payments: [
        {
          payment_id: `PAY-${d.dist.substring(0, 3).toUpperCase()}-${4000 + i}`,
          unique_work_number: id,
          vendor_name: vendor,
          implementing_agency_name: agency,
          expenditure_date: `14-06-2025`,
          payment_status: "Payment Success",
          expenditure_amount: paidAmount,
          invoice_ref: `INV-GEN-${200 + i}`,
          pfms_ref: `C0625${100000 + i}`
        }
      ],
      evidence_items: [
        {
          id: `EVD-${id}-1`,
          title: "Administrative Sanction Order",
          type: "sanction_order",
          date: `15-04-2025`,
          ref_number: `AS-DA-${2025}-${id}`,
          source: "eSAKSHI Portal",
          provenance: "Synthetic Demo",
          status: "Verified",
          description: "Administrative approval order from District Collector office.",
          file_size: "1.1 MB",
          verified: true
        }
      ]
    };
    
    additional.push(work);
  }
  
  return additional;
}

export const ALL_SEED_WORKS: RecommendedWork[] = [
  ...INITIAL_WORKS,
  ...generateAdditionalWorks()
];

export const INITIAL_AGENCIES: AgencyProfile[] = [
  {
    id: "agency-djb-south",
    name: "Delhi Jal Board (Executive Division South)",
    normalized_name: "DELHI JAL BOARD",
    district: "South Delhi",
    lgd_code: 142,
    total_works: 14,
    completed_works: 6,
    ongoing_works: 8,
    overdue_works: 3,
    evidence_gaps: 2,
    payment_mismatches: 2,
    unresolved_reviews: 2,
    median_progress_percent: 54,
    total_sanctioned: 16800000,
    total_expended: 12200000,
    key_vendors: [
      { vendor_name: "AquaTech Infra Pvt Ltd", count: 5, total_amount: 5400000 },
      { vendor_name: "Apex Piping & Pumps", count: 4, total_amount: 3800000 }
    ],
    delivery_pattern_flag: true,
    delivery_pattern_summary: "2 of 8 ongoing works display payment disbursements leading physical progress by >30 percentage points."
  },
  {
    id: "agency-sa-apwd",
    name: "EE (SAD, APWD)",
    normalized_name: "EE SAD APWD",
    district: "South Andamans",
    lgd_code: 602,
    total_works: 18,
    completed_works: 12,
    ongoing_works: 6,
    overdue_works: 2,
    evidence_gaps: 4,
    payment_mismatches: 1,
    unresolved_reviews: 2,
    median_progress_percent: 78,
    total_sanctioned: 24500000,
    total_expended: 21800000,
    key_vendors: [
      { vendor_name: "Haneefa Construction", count: 7, total_amount: 8940000 },
      { vendor_name: "Island Structural Builders", count: 3, total_amount: 4200000 }
    ],
    delivery_pattern_flag: true,
    delivery_pattern_summary: "High vendor concentration detected: Haneefa Construction accounts for 41% of all sanctions."
  },
  {
    id: "agency-indore-imc-zn7",
    name: "Indore Municipal Corporation (Zone 7)",
    normalized_name: "INDORE MUNICIPAL CORPORATION",
    district: "Indore",
    lgd_code: 402,
    total_works: 22,
    completed_works: 14,
    ongoing_works: 8,
    overdue_works: 2,
    evidence_gaps: 1,
    payment_mismatches: 1,
    unresolved_reviews: 3,
    median_progress_percent: 72,
    total_sanctioned: 38500000,
    total_expended: 31200000,
    key_vendors: [
      { vendor_name: "Malwa Infra Buildcon", count: 6, total_amount: 11400000 },
      { vendor_name: "Kalyan Construction Co.", count: 4, total_amount: 6800000 }
    ],
    delivery_pattern_flag: true,
    delivery_pattern_summary: "Contiguous work pair (MPLAD-2026-MP-0401/0402) detected with potential split tendering."
  },
  {
    id: "agency-indore-res",
    name: "Rural Engineering Services (RES Division 1)",
    normalized_name: "RURAL ENGINEERING SERVICES",
    district: "Indore",
    lgd_code: 402,
    total_works: 26,
    completed_works: 18,
    ongoing_works: 8,
    overdue_works: 1,
    evidence_gaps: 2,
    payment_mismatches: 0,
    unresolved_reviews: 1,
    median_progress_percent: 81,
    total_sanctioned: 41200000,
    total_expended: 35600000,
    key_vendors: [
      { vendor_name: "Shree Ram Construction Co", count: 5, total_amount: 8900000 },
      { vendor_name: "Bharat Vikas Infra Tech", count: 4, total_amount: 6200000 }
    ],
    delivery_pattern_flag: false,
    delivery_pattern_summary: "Overall operational metrics are within standard district delivery tolerances."
  }
];

export const INITIAL_AUDIT_LOG: AuditLogEntry[] = [
  {
    id: "AUD-1001",
    timestamp: "18-09-2026, 08:02:14",
    work_id: "MPLAD-2026-DL-0142",
    work_name: "Construction of Deep Borewell & 60,000 Ltr Community Water Tank",
    actor_role: "System (Risk Engine v1.0)",
    actor_name: "Nigrani Automated Detector",
    action: "Alert Generated",
    previous_state: "Normal Portfolio Work",
    new_state: "High Priority Review Flag (Score: 78)",
    details: "Payment-Progress gap (48 percentage points) and stale visual inspection (52 days) triggered automated review alert."
  },
  {
    id: "AUD-1002",
    timestamp: "18-09-2026, 08:02:15",
    work_id: "WS/MP18275/2025-2026/183102",
    work_name: "Construction of Community Centers at Sri Guruji Centre",
    actor_role: "System (Compliance Engine)",
    actor_name: "Nigrani Compliance Rule 3.12",
    action: "Alert Generated",
    previous_state: "Normal Portfolio Work",
    new_state: "High Priority Review Flag (Score: 82)",
    details: "Sanction amount ₹84.50L breached statutory Trust ceiling of ₹75L with zero photo upload."
  },
  {
    id: "AUD-1003",
    timestamp: "18-09-2026, 08:02:16",
    work_id: "MPLAD-2026-MP-0401",
    work_name: "Construction of CC Road in Sector 4B, Ward 18",
    actor_role: "System (GIS & Text Similarity)",
    actor_name: "Nigrani Spatial Detector",
    action: "Alert Generated",
    previous_state: "Normal Portfolio Work",
    new_state: "High Priority Review Flag (Score: 80)",
    details: "Near-duplicate pair identified with MPLAD-2026-MP-0402 (42m separation, 0.91 similarity score)."
  },
  {
    id: "AUD-1004",
    timestamp: "18-09-2026, 08:35:10",
    work_id: "MPLAD-2026-DL-0142",
    work_name: "Construction of Deep Borewell & 60,000 Ltr Community Water Tank",
    actor_role: "District Authority",
    actor_name: "Sh. Rajesh Verma (Collector & DM)",
    action: "Officer Opened Evidence Packet",
    previous_state: "Pending Review",
    new_state: "Under Active Review",
    details: "Inspected payment disbursements #PAY-DL-9412 and verified physical progress MB records."
  }
];
